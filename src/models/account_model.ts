import { Model } from 'pinia-orm'
import Task from './task_model'
import Deposit from './deposit_model'
import Withdraw from './withdraw_model'
import Reward from './reward_model'

export default class Account extends Model {
  static entity = 'account'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      deposits: this.attr(null),
      withdraws: this.attr(null),
      rewards: this.attr(null),
      tasks: this.attr(null),
    }
  }

  declare id: number
  declare name: string
  declare deposits: Array<Deposit>
  declare withdraws: Array<Withdraw>
  declare rewards: Array<Reward>
  declare tasks: Array<Task>
}
