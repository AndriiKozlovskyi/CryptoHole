import TagResponse from './tag_response'
import TaskResponse from './task_response'
import UserResponse from './user_response'

export default interface EventResponse {
  id: number
  name: string
  tags: TagResponse[]
  participants: UserResponse[]
  src: string
  tasks: TaskResponse[]
  saved: boolean
  startDate: string
  endDate: string
}
