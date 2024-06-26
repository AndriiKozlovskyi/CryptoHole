import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import BaseApiResponse from '@/dtos/responses/base_api_response'
import { SavedProjectResponse } from '@/dtos/responses/saved_project_response'

export default class CategoryApi {
  static baseUrl = 'http://localhost:8080/api/v1/saved_project'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async getAllSavedProjects(): Promise<BaseApiResponse<SavedProjectResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get('');
  }

  public static async unsaveProject(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).post(`/${id}/unsave`, null);
  }
}
