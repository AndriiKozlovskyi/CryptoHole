import { Model } from 'pinia-orm'

export default class Income extends Model {
  static entity = 'income'

  static fields() {
    return {
      id: this.number(null),
      amount: this.number(null),
      account: this.number(null),
      date: this.string(''),
    }

	}
	declare id: number
	declare amount: number
    declare account: number
	declare date: string
}