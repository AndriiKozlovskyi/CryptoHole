import { Model } from 'pinia-orm'
import Project from './project_model'

export default class Tag extends Model {
  static entity = 'tag'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      projects: this.belongsToMany(Project, 'project_tag', 'tag_id', 'project_id')
    }
  }

  declare id: number
  declare name: string
  declare projects: Project[]
}
