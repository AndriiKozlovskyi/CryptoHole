import TagResponse from "./tag_response"

export interface ProjectResponse {
  id: number
  name: string
  tags: TagResponse[]
  expenses: number
  participants: number
  src: string
  saved: boolean
}
