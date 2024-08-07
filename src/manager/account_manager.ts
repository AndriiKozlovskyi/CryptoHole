import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import Account from '@/models/account_model'
import AccountApi from '@/api/account_api'
import AccountResponse from '@/dtos/responses/account_response'
import AccountRequest from '@/dtos/requests/account_request'
import SavedEventManager from './saved_event_manager'

export default class AccountManager {
  protected static get repository() {
    return useRepo(Account, store)
  }

  static all(): Collection<Account> {
    return this.repository.all()
  }

  static getById(id: number): Account | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const account = await AccountApi.updateAccount(id, rest)
    await SavedEventManager.loadAll();
    const accountRequest: AccountRequest = account.data;
    this.repository.where('id', id).update(accountRequest)
  }

  static async loadAll(savedEventId: number) {
    const response = await AccountApi.allAccounts(savedEventId)
    const accounts = this.getFormattedAccounts(response.data)
    this.repository.save(accounts)
  }

  static async createAccount(savedEventId: number, account: AccountRequest) {
    const accountResponse = await AccountApi.createAccount(savedEventId, account)
    const accountResult = this.getFormattedAccount(accountResponse.data)

    await SavedEventManager.loadAll();
    this.repository.save(accountResult)
  }

  static async deleteAccount(id: number) {
    await AccountApi.deleteAccount(id)
    SavedEventManager.loadAll();

    this.repository.destroy(id)
  }

  public static getFormattedAccounts(accounts: Array<AccountResponse>) {
    const _this = this
    return accounts.map((account) => {
      return _this.getFormattedAccount(account)
    })
  }

  private static getFormattedAccount(accountResponse: AccountResponse) {
    return {
      id: accountResponse.id,
      name: accountResponse.name,
      deposits: accountResponse.deposits,
      withdraws: accountResponse.withdraws,
      rewards: accountResponse.rewards,
      tasks: accountResponse.tasks
    }
  }
}
