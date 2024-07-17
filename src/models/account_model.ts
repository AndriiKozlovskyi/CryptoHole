import DepositResponse from '@/dtos/responses/deposit_response'
import RewardResponse from '@/dtos/responses/reward_response'
import WithdrawResponse from '@/dtos/responses/withdraw_response'
import { Model } from 'pinia-orm'
import Task from './task_model'
import TaskResponse from '@/dtos/responses/task_response'

export default class Account extends Model {
  static entity = 'account'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      deposits: this.attr(null),
      withdraws: this.attr(null),
      rewards: this.attr(null),
      tasks: this.attr(Array<Task>),
    }
  }

  declare id: number
  declare name: string
  declare deposits: Array<DepositResponse>
  declare withdraws: Array<WithdrawResponse>
  declare rewards: Array<RewardResponse>
  declare tasks: Array<TaskResponse>
}
