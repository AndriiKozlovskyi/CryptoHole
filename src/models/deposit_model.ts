import { Model } from 'pinia-orm'

export default class Deposit extends Model {
  static entity = 'deposit'

  static fields() {
    return {
      id: this.number(null),
      amount: this.number(null),
      date: this.string(''),
    }

	}
	declare id: number
	declare amount: number
	declare date: string
}