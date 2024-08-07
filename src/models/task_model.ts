import { Model } from 'pinia-orm'

export default class Task extends Model {
  static entity = 'task'

  static fields() {
    return {
      id: this.number(null),
      header: this.string(''),
      description: this.string(''),
      completed: this.boolean(false),
    }
  }

  declare id: number
  declare header: string
  declare description: string
  declare completed: boolean
}
