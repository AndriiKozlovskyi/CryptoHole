import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import DepositRequest from '@/dtos/requests/deposit_request'
import DepositResponse from '@/dtos/responses/deposit_response'

export default class DepositApi {
  static baseUrl = 'http://localhost:8080/api/v1/'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allDeposits(
    accountId: number
  ): Promise<BaseApiResponse<DepositResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`deposit?accountId=${accountId}`)
  }

  public static async createDeposit(
    accountId: number,
    depositRequest: DepositRequest
  ): Promise<BaseApiResponse<DepositResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`deposit?accountId=${accountId}`,
        depositRequest
    )
  }

  public static async updateDeposit(
    id: number,
    depositRequest: DepositRequest
  ): Promise<BaseApiResponse<DepositResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`deposit/${id}`, depositRequest)
  }

  public static async deleteDeposit(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`deposit/${id}`)
  }
}
