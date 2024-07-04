import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import SavedEventResponse from '@/dtos/responses/saved_event_response'
import SavedEventRequest from '@/dtos/requests/saved_event_request'

export default class SavedEventApi {
  static baseUrl = 'http://localhost:8080/api/v1/saved_event'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allSavedEvents(): Promise<BaseApiResponse<SavedEventResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get('')
  }

  public static async createSavedEvent(savedEventRequest: SavedEventRequest): Promise<BaseApiResponse<SavedEventResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post('', savedEventRequest)
  }

  public static async updateSavedEvent(id: number, savedEventRequest: SavedEventRequest): Promise<BaseApiResponse<SavedEventResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`/${id}`, savedEventRequest);
  }

  public static async deleteSavedEvent(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`/${id}`);
  }
}