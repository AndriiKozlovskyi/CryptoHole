import { Model } from 'pinia-orm'

export default class Account extends Model {
  static entity = 'account'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      outcome: this.number(0),
      income: this.number(0),
    }
  }

  declare id: number
  declare name: string
  declare outcome: number
  declare income: number
}