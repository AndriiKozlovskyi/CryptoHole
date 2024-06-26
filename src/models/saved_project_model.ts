import { Model } from 'pinia-orm'

export default class SavedProject extends Model {
  static entity = 'saved_project'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      project: this.number(0),
      expenses: this.number(0),
      status: this.string(''),
      amountOfAccs: this.number(0)
    }
  }

  declare id: number
  declare name: string
  declare project: number
  declare expenses: number
  declare status: string
  declare amountOfAccs: number
}
