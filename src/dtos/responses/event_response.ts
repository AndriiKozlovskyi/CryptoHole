import TagResponse from './tag_response'
import UserResponse from './user_response'

export default interface EventResponse {
  id: number
  name: string
  tags: TagResponse[]
  participants: UserResponse[]
  src: string
  link: string
  saved: boolean
  startDate: string
  endDate: string
}
