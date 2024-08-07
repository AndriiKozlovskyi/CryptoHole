import { Model } from 'pinia-orm'
import Tag from './tag_model'
import User from './user_model'
import Task from './task_model'

export default class Event extends Model {
  static entity = 'event'

  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      tags: this.attr(Array<Tag>),
      participants: this.attr(Array<User>),
      link: this.string(''),
      src: this.string(''),
      tasks: this.attr(Array<Task>),
      saved: this.boolean(false),
      startDate: this.string(''),
      endDate: this.string('')
    }
  }

  declare id: number
  declare name: string
  declare tags: Array<Tag>
  declare participants: Array<User>
  declare link: string
  declare src: string
  declare tasks: Array<Task>
  declare saved: boolean
  declare startDate: string
  declare endDate: string
}
