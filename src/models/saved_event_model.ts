import { Model } from 'pinia-orm'
import Account from './account_model'

export default class SavedEvent extends Model {
  static entity = 'saved_event'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      event: this.number(0),
      status: this.string(''),
      link: this.string(''),
      accounts: this.attr(Array<Account>),
      orderNumber: this.number(0),
      rewardType: this.string(''),
      startDate: this.string(''),
      endDate: this.string('')
    }
  }

  declare id: number
  declare name: string
  declare event: number
  declare status: string
  declare link: string
  declare accounts: Array<Account>
  declare orderNumber: number
  declare rewardType: string
  declare startDate: string
  declare endDate: string
}
