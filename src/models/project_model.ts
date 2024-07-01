import { Model } from 'pinia-orm'
import Tag from './tag_model'

export default class Project extends Model {
  static entity = 'project'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      tags: this.attr(Array<Tag>),
      expenses: this.number(0),
      participants: this.number(0),
      src: this.string(''),
      saved: this.boolean(false)
    }
  }

  declare id: number
  declare name: string
  declare tags: Array<Tag>
  declare expenses: number
  declare participants: number
  declare src: string
  declare saved: boolean
}
