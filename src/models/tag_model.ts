import { Model } from 'pinia-orm'
import Event from "@/models/event_model";

export default class Tag extends Model {
  static entity = 'tag'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      events: this.hasMany(Event, 'event_id')
    }
  }

  declare id: number
  declare name: string
}
