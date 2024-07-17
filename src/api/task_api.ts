import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import TaskResponse from '@/dtos/responses/task_response'
import TaskRequest from '@/dtos/requests/task_request'

export default class TaskApi {
  static baseUrl = 'http://localhost:8080/api/v1'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allTasks(savedEventId: number): Promise<BaseApiResponse<TaskResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`/task?savedEventId=${savedEventId}`)
  }

  public static async createTask(
    savedEventId: number,
    taskRequest: TaskRequest
  ): Promise<BaseApiResponse<TaskResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`/task?savedEventId=${savedEventId}`, taskRequest)
  }

  public static async updateTask(
    id: number,
    taskRequest: TaskRequest
  ): Promise<BaseApiResponse<TaskResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`/task/${id}`, taskRequest)
  }

  public static async deleteTask(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`/task/${id}`)
  }
}
