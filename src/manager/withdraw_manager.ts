import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import SavedEventManager from './saved_event_manager'
import WithdrawApi from '@/api/withdraw_api'
import WithdrawRequest from '@/dtos/requests/withdraw_request'
import WithdrawResponse from '@/dtos/responses/withdraw_response'
import Withdraw from '@/models/withdraw_model'

export default class WithdrawManager {
  protected static get repository() {
    return useRepo(Withdraw, store)
  }

  static all(): Collection<Withdraw> {
    return this.repository.all()
  }

  static getById(id: number): Withdraw | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const withdraw = await WithdrawApi.updateWithdraw(id, rest)
    await WithdrawManager.loadAll(withdraw.data.account);
    const withdrawRequest: WithdrawRequest = withdraw.data;
    this.repository.where('id', id).update(withdrawRequest)
  }

  static async loadAll(accountId: number) {
    const response = await WithdrawApi.allWithdraws(accountId)
    const income = this.getFormattedWithdraws(response.data)
    this.repository.save(income)
  }

  static async createIncome(accountId: number, withdraw: WithdrawRequest) {
    const withdrawResponse = await WithdrawApi.createWithdraw(accountId, withdraw)
    const withdrawResult = this.getFormattedWithdraw(withdrawResponse.data)

    await SavedEventManager.loadAll();
    this.repository.save(withdrawResult)
  }

  static async deleteWithdraw(id: number) {
    await WithdrawApi.deleteWithdraw(id)
    SavedEventManager.loadAll();

    this.repository.destroy(id)
  }

  public static getFormattedWithdraws(incomes: Array<WithdrawResponse>) {
    const _this = this
    return incomes.map((income) => {
      return _this.getFormattedWithdraw(income)
    })
  }

  private static getFormattedWithdraw(withdrawResponse: WithdrawResponse) {
    return {
      id: withdrawResponse.id,
      account: withdrawResponse.account,
      amount: withdrawResponse.amount,
      date: withdrawResponse.date,
    }
  }
}
