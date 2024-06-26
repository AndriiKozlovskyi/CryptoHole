import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import { ProjectRequest } from '@/dtos/requests/project_request'
import { ProjectResponse } from '@/dtos/responses/project_response'
import { SavedProjectResponse } from '@/dtos/responses/saved_project_response'

export default class CategoryApi {
  static baseUrl = 'http://localhost:8080/api/v1/project'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async getAllProjects(): Promise<BaseApiResponse<ProjectResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get('')
  }

  public static async createProject(project: ProjectRequest): Promise<BaseApiResponse<ProjectResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post('', project)
  }

  public static async saveProject(id: number): Promise<BaseApiResponse<SavedProjectResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`/${id}/save`, null);
  }
}
