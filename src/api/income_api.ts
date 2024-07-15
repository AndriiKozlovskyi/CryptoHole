import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import DepositRequest from '@/dtos/requests/deposit_request'
import DepositResponse from '@/dtos/responses/deposit_response'
import IncomeResponse from '@/dtos/responses/income_response'
import IncomeRequest from '@/dtos/requests/income_request'

export default class IncomeApi {
  static baseUrl = 'http://localhost:8080/api/v1/'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allIncomes(
    accountId: number
  ): Promise<BaseApiResponse<IncomeResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`income?accountId=${accountId}`)
  }

  public static async createIncome(
    accountId: number,
    incomeRequest: IncomeRequest
  ): Promise<BaseApiResponse<IncomeResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`income?accountId=${accountId}`,
        incomeRequest
    )
  }

  public static async updateIncome(
    id: number,
    incomeRequest: IncomeRequest
  ): Promise<BaseApiResponse<IncomeResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`income/${id}`, incomeRequest)
  }

  public static async deleteIncome(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`income/${id}`)
  }
}
