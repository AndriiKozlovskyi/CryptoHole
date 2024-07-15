import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import WithdrawResponse from '@/dtos/responses/withdraw_response'
import WithdrawRequest from '@/dtos/requests/withdraw_request'

export default class WithdrawApi {
  static baseUrl = 'http://localhost:8080/api/v1/'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allWithdraws(
    accountId: number
  ): Promise<BaseApiResponse<WithdrawResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`withdraw?accountId=${accountId}`)
  }

  public static async createWithdraw(
    accountId: number,
    withdrawRequest: WithdrawRequest
  ): Promise<BaseApiResponse<WithdrawResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`withdraw?accountId=${accountId}`,
        withdrawRequest
    )
  }

  public static async updateWithdraw(
    id: number,
    withdrawRequest: WithdrawRequest
  ): Promise<BaseApiResponse<WithdrawResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`withdraw/${id}`, withdrawRequest)
  }

  public static async deleteWithdraw(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`withdraw/${id}`)
  }
}
