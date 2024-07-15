import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import RewardResponse from '@/dtos/responses/reward_response'
import RewardRequest from '@/dtos/requests/reward_request'

export default class RewardApi {
  static baseUrl = 'http://localhost:8080/api/v1/'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allRewards(
    accountId: number
  ): Promise<BaseApiResponse<RewardResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`reward?accountId=${accountId}`)
  }

  public static async createReward(
    accountId: number,
    rewardRequest: RewardRequest
  ): Promise<BaseApiResponse<RewardResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`reward?accountId=${accountId}`,
        rewardRequest
    )
  }

  public static async updateReward(
    id: number,
    rewardRequest: RewardRequest
  ): Promise<BaseApiResponse<RewardResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`reward/${id}`, rewardRequest)
  }

  public static async deleteReward(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`reward/${id}`)
  }
}
