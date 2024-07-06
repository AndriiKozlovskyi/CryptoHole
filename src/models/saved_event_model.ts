import { Model } from 'pinia-orm'
import Tag from './tag_model'
import User from './user_model'
import Task from './task_model'
import Account from './account_model'

export default class SavedEvent extends Model {
  static entity = 'saved_event'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      event: this.number(0),
      status: this.string(''),
      accounts: this.attr(Array<Account>),
      orderNumber: this.number(0),
      startDate: this.string(''),
      endDate: this.string(''),
    }
  }

  declare id: number
  declare name: string
  declare event: number
  declare status: string
  declare accounts: Array<Account>
  declare orderNumber: number
  declare startDate: String
  declare endDate: String
}