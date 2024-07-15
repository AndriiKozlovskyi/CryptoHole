import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import SavedEventManager from './saved_event_manager'
import Deposit from '@/models/deposit_model'
import DepositRequest from '@/dtos/requests/deposit_request'
import DepositResponse from '@/dtos/responses/deposit_response'
import DepositApi from '@/api/deposit_api'

export default class DepositManager {
  protected static get repository() {
    return useRepo(Deposit, store)
  }

  static all(): Collection<Deposit> {
    return this.repository.all()
  }

  static getById(id: number): Deposit | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const deposit = await DepositApi.updateDeposit(id, rest)
    await DepositManager.loadAll(id);
    const depositRequest: DepositRequest = deposit.data;
    this.repository.where('id', id).update(depositRequest)
  }

  static async loadAll(accountId: number) {
    const response = await DepositApi.allDeposits(accountId)
    const deposits = this.getFormattedDeposits(response.data)
    this.repository.save(deposits)
  }

  static async createDeposit(accountId: number, deposit: DepositRequest) {
    const depositResponse = await DepositApi.createDeposit(accountId, deposit)
    const depositResult = this.getFormattedDeposit(depositResponse.data)

    await SavedEventManager.loadAll();
    this.repository.save(depositResult)
  }

  static async deleteDeposit(id: number) {
    await DepositApi.deleteDeposit(id)
    SavedEventManager.loadAll();

    this.repository.destroy(id)
  }

  public static getFormattedDeposits(deosits: Array<DepositResponse>) {
    const _this = this
    return deosits.map((deposit) => {
      return _this.getFormattedDeposit(deposit)
    })
  }

  private static getFormattedDeposit(depositResponse: DepositResponse) {
    return {
      id: depositResponse.id,
      account: depositResponse.account,
      amount: depositResponse.amount,
      date: depositResponse.date,
    }
  }
}
