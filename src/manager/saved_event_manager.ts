import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import SavedEvent from '@/models/saved_event_model'
import SavedEventResponse from '@/dtos/responses/saved_event_response'
import AccountManager from './account_manager'
import SavedEventApi from '@/api/saved_event_api'
import SavedEventRequest from '@/dtos/requests/saved_event_request'
import EventApi from '@/api/event_api'
import EventManager from './event_manager'
import EventRequest from '@/dtos/requests/event_request'

export default class SavedEventManager {
  protected static get repository() {
    return useRepo(SavedEvent, store)
  }

  static getEventsByStartDate(startDate: Date): SavedEvent[] {
    return this.repository.all().filter((event) => {
      const _startDate: Date = new Date(String(event.startDate))

      return (
        _startDate.getDate() === startDate?.getDate() &&
        _startDate.getMonth() === startDate?.getMonth() &&
        _startDate.getFullYear() === startDate?.getFullYear()
      )
    })
  }

  static getEventsByEndDate(endDate: Date): SavedEvent[] {
    return this.repository.all().filter((event) => {
      const _endDate: Date = new Date(String(event.endDate))

      return (
        _endDate.getDate() === endDate?.getDate() &&
        _endDate.getMonth() === endDate?.getMonth() &&
        _endDate.getFullYear() === endDate?.getFullYear()
      )
    })
  }

  static all(): Collection<SavedEvent> {
    return this.repository.all().sort((a, b) => a.orderNumber - b.orderNumber)
  }

  static getById(id: number): SavedEvent | null {
    return this.repository.find(id)
  }

  static async update(id: number, _savedEvent: SavedEventRequest) {
    const event = await SavedEventApi.updateSavedEvent(id, _savedEvent)
    const savedEventRequest: SavedEventRequest = event.data;
    this.repository.where('id', id).update(savedEventRequest)
  }

  static async loadAll() {
    const response = await SavedEventApi.allSavedEvents()
    const savedEvents = this.getFormatedSavedEvents(response.data)

    this.repository.save(savedEvents)
  }

  static async createSavedEvent(savedEvent: SavedEventRequest) {
    const savedEventResponse = await SavedEventApi.createSavedEvent(savedEvent)
    const savedEventResult = this.getFormatedSavedEvent(savedEventResponse.data)

    this.repository.save(savedEventResult)
  }

  static async participateEvent(id: number) {
    const savedEvent = await EventApi.participateEvent(id)
    const result = this.getFormatedSavedEvent(savedEvent.data)
    this.repository.save(result)

    const event = EventManager.getById(id)
    event.saved = true
    EventManager.repository.where('id', event.id).update(event);
  }

  static async unparticipateEvent(id: number) {
    const savedEventId = this.repository.where('event', id).first()
    this.repository.destroy(savedEventId.id)
    await EventApi.unparticipateEvent(id)

    const event = EventManager.getById(id)
    event.saved = false
    EventManager.repository.where('id', event.id).update(event);
  }

  static async deleteSavedEvent(id: number) {
    await SavedEventApi.deleteSavedEvent(id)
    EventManager.loadAll();
    this.repository.destroy(id)
  }

  private static getFormatedSavedEvents(savedEvents: Array<SavedEventResponse>) {
    const _this = this
    return savedEvents.map((savedEvent) => {
      return _this.getFormatedSavedEvent(savedEvent)
    })
  }

  public static getSavedEventByEventId(id: number) {
    return this.all().find(savedEvent => savedEvent.event === id);
  }

  static getEventByName(name: string) {
    return this.repository.where('name', name).first()
  }

  private static getFormatedSavedEvent(savedEventResponse: SavedEventResponse) {
    return {
      id: savedEventResponse.id,
      name: savedEventResponse.name,
      event: savedEventResponse.event,
      status: savedEventResponse.status,
      accounts: AccountManager.getFormattedAccounts(savedEventResponse.accounts),
      orderNumber: savedEventResponse.orderNumber,
      startDate: savedEventResponse.startDate,
      endDate: savedEventResponse.endDate
    }
  }
}
