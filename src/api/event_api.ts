import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import { ProjectResponse } from '@/dtos/responses/project_response'
import EventResponse from '@/dtos/responses/event_response'
import EventRequest from '@/dtos/requests/event_request'
import SavedEventResponse from '@/dtos/responses/saved_event_response'

export default class EventApi {
  static baseUrl = 'http://localhost:8080/api/v1/event'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allEvents(): Promise<BaseApiResponse<EventResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get('')
  }

  public static async createEvent(eventRequest: EventRequest): Promise<BaseApiResponse<EventResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post('', eventRequest)
  }

  public static async participateEvent(id: number): Promise<BaseApiResponse<SavedEventResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`/${id}/participate`, AuthManager.getToken());
  }

  public static async unparticipateEvent(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).post(`/${id}/unparticipate`, AuthManager.getToken());
  }

  public static async updateEvent(id: number, eventRequest: EventRequest): Promise<BaseApiResponse<ProjectResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`/${id}`, eventRequest);
  }

  public static async deleteEvent(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`/${id}`);
  }
}