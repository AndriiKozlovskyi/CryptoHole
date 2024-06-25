import { Model } from 'pinia-orm'

export default class ProjectTag extends Model {
  static entity = 'project_tag'

  static primaryKey = ['project_id', 'tag_id']

  static fields() {
    return {
      project_id: this.number(null),
      tag_id: this.number(null)
    }
  }
}
