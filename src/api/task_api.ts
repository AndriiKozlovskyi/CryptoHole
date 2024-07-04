import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import AccountResponse from '@/dtos/responses/account_response'
import AccountRequest from '@/dtos/requests/account_request'
import TaskResponse from '@/dtos/responses/task_response'
import TaskRequest from '@/dtos/requests/task_request'

export default class TaskApi {
  static baseUrl = 'http://localhost:8080/api/v1/task'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allTasks(eventId: number): Promise<BaseApiResponse<TaskResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`?eventId=${eventId}`);
  }

  public static async createTask(eventId: number, taskRequest: TaskRequest): Promise<BaseApiResponse<TaskResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`?eventId=${eventId}`, taskRequest)
  }

  public static async updateTask(id: number, taskRequest: TaskRequest): Promise<BaseApiResponse<TaskResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`/${id}`, taskRequest);
  }

  public static async deleteTask(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`/${id}`);
  }
}