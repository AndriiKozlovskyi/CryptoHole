import DepositResponse from '@/dtos/responses/deposit_response'
import IncomeResponse from '@/dtos/responses/income_response'
import { Model } from 'pinia-orm'

export default class Account extends Model {
  static entity = 'account'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      deposits: this.attr(null),
      incomes: this.attr(null),
    }
  }

  declare id: number
  declare name: string
  declare deposits: Array<DepositResponse>
  declare incomes: Array<IncomeResponse>
}
