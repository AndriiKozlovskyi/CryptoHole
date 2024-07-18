import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import TagManager from './tag_manager'
import Event from '@/models/event_model'
import EventRequest from '@/dtos/requests/event_request'
import EventApi from '@/api/event_api'
import EventResponse from '@/dtos/responses/event_response'
import UserManager from './user_manager'
export default class EventManager {
  static get repository() {
    return useRepo(Event, store)
  }

  static all(): Collection<Event> {
    return this.repository.all()
  }

  static getById(id: number): Event | null {
    return this.repository.find(id)
  }

  static async update(id: number, eventRequest: EventRequest) {
    const event = await EventApi.updateEvent(id, eventRequest)
    const evetReq: EventRequest = this.eventResponseToEventRequest(event.data);

    this.repository.where('id', id).update(evetReq)
  }

  static async loadAll() {
    const response = await EventApi.allEvents()
    const events = this.getFormatedEvents(response.data)

    this.repository.save(events)
  }

  static async createEvent(event: EventRequest) {
    const eventResponse = await EventApi.createEvent(event)
    const eventResult = this.getFormatedEvent(eventResponse.data)

    this.repository.save(eventResult)
  }

  static async deleteEvent(id: number) {
    await EventApi.deleteEvent(id)

    this.repository.destroy(id)
  }

  private static getFormatedEvents(events: Array<EventResponse>) {
    const _this = this
    return events.map((event) => {
      return _this.getFormatedEvent(event)
    })
  }

  static getEventByName(name: string) {
    return this.repository.where('name', name).first()
  }

  public static eventResponseToEventRequest(eventResponse: EventResponse): EventRequest {
    return {
      name: eventResponse.name,
      tagsIds: TagManager.getTagsIds(eventResponse.tags),
      link: eventResponse.link,
      src: eventResponse.src,
      startDate: eventResponse.startDate,
      endDate: eventResponse.endDate,
    }
  }

  private static getFormatedEvent(eventResponse: EventResponse) {
    return {
      id: eventResponse.id,
      name: eventResponse.name,
      tags: TagManager.getFormatedTags(eventResponse.tags),
      participants: UserManager.getFormatedUsers(eventResponse.participants),
      link: eventResponse.link,
      src: eventResponse.src,
      saved: eventResponse.saved,
      startDate: eventResponse.startDate,
      endDate: eventResponse.endDate,
    }
  }
}
