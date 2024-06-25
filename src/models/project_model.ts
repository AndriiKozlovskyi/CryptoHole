import { Model } from 'pinia-orm'
import Tag from './tag_model'

export default class Project extends Model {
  static entity = 'project'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      tags: this.belongsToMany(Tag, 'project_tag', 'project_id', 'tag_id'),
      expenses: this.number(0),
      participants: this.number(0),
      src: this.string('')
    }
  }

  declare id: number
  declare name: string
  declare tag: Tag[]
  declare expenses: number
  declare participants: number
  declare src: string
}
