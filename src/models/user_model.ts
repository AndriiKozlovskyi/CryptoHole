import { Model } from 'pinia-orm'

export default class User extends Model {
  static entity = 'user'

  static fields() {
    return {
      id: this.number(null),
      username: this.string(''),
    }
  }

  declare id: number
  declare username: string
}