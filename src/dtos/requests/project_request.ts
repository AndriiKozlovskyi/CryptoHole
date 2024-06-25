import { Tag } from "@/entity/tag"

export interface ProjectRequest {
    name: string
    tags: Tag[]
    expenses: number
    participants: number
    src: string
  }
  