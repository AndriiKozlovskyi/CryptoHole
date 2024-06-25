import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from './api_factory'
import ApiOptions, { defaultApiOptions } from './api_options'
import AuthManager from '@/manager/auth_manager'
import { ProjectRequest } from '@/dtos/requests/project_request'

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
  
    public static async createProject(project: ProjectRequest) {
      return await ApiFactory.getInstance(this.getOptions()).post('', project)
    }
  
  
}
  