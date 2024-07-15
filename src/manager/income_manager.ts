import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import SavedEventManager from './saved_event_manager'
import Deposit from '@/models/deposit_model'
import DepositRequest from '@/dtos/requests/deposit_request'
import DepositResponse from '@/dtos/responses/deposit_response'
import DepositApi from '@/api/deposit_api'
import Income from '@/models/income_model'
import IncomeApi from '@/api/income_api'
import IncomeRequest from '@/dtos/requests/income_request'
import IncomeResponse from '@/dtos/responses/income_response'

export default class IncomeManager {
  protected static get repository() {
    return useRepo(Income, store)
  }

  static all(): Collection<Income> {
    return this.repository.all()
  }

  static getById(id: number): Income | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const income = await IncomeApi.updateIncome(id, rest)
    await IncomeManager.loadAll(id);
    const incomeReequest: IncomeRequest = income.data;
    this.repository.where('id', id).update(incomeReequest)
  }

  static async loadAll(accountId: number) {
    const response = await IncomeApi.allIncomes(accountId)
    const income = this.getFormattedIncomes(response.data)
    this.repository.save(income)
  }

  static async createIncome(accountId: number, income: IncomeRequest) {
    const incomeResponse = await IncomeApi.createIncome(accountId, income)
    const incomeResult = this.getFormattedIncome(incomeResponse.data)

    await SavedEventManager.loadAll();
    this.repository.save(incomeResult)
  }

  static async deleteIncome(id: number) {
    await IncomeApi.deleteIncome(id)
    SavedEventManager.loadAll();

    this.repository.destroy(id)
  }

  public static getFormattedIncomes(incomes: Array<IncomeResponse>) {
    const _this = this
    return incomes.map((income) => {
      return _this.getFormattedIncome(income)
    })
  }

  private static getFormattedIncome(incomeResponse: IncomeResponse) {
    return {
      id: incomeResponse.id,
      account: incomeResponse.account,
      amount: incomeResponse.amount,
      date: incomeResponse.date,
    }
  }
}
