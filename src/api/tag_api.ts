import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import TagResponse from '@/dtos/responses/tag_response'
import TagRequest from '@/dtos/requests/tag_request'

export default class TagApi {
    static baseUrl = 'http://localhost:8080/api/v1/tag'
  
    static getOptions(): ApiOptions {
      return {
        ...defaultApiOptions,
        baseUrl: this.baseUrl,
        useAuth: true,
        getAccessToken: async () => AuthManager.getToken()
      }
    }
  
    public static async getAllTags(): Promise<BaseApiResponse<TagResponse[]>> {
      return await ApiFactory.getInstance(this.getOptions()).get('')
    }
  
    public static async createTag(tag: TagRequest): Promise<BaseApiResponse<TagResponse>> {
      return await ApiFactory.getInstance(this.getOptions()).post('', tag)
    }

    public static async deleteTag(id: number) {
      return await ApiFactory.getInstance(this.getOptions()).delete(`/${id}`);
    }
  }