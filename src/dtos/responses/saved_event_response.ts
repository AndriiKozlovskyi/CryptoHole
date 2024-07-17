import AccountResponse from './account_response'
import TaskResponse from './task_response'

export default interface SavedEventResponse {
  id: number
  name: string
  event: number
  status: string
  accounts: AccountResponse[]
  tasks: TaskResponse[]
  orderNumber: number
  link: string
  rewardType: string
  startDate: string
  endDate: string
}
