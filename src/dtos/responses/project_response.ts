import { Tag } from '@/entity/tag'

export interface Projectesponse {
  id: number
  name: string
  tags: Tag[]
  expenses: number
  participants: number
  src: string
}
