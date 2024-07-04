import BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from './base/api_options'
import AuthManager from '@/manager/auth_manager'
import AccountResponse from '@/dtos/responses/account_response'
import AccountRequest from '@/dtos/requests/account_request'

export default class AccountApi {
  static baseUrl = 'http://localhost:8080/api/v1/account'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async allAccounts(savedEventId: number): Promise<BaseApiResponse<AccountResponse[]>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`?savedEventId=${savedEventId}`);
  }

  public static async createAccount(savedEventId: number, accountRequest: AccountRequest): Promise<BaseApiResponse<AccountResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post(`?savedEventId=${savedEventId}`, accountRequest)
  }

  public static async updateAccount(id: number, accountRequest: AccountRequest): Promise<BaseApiResponse<AccountResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).put(`/${id}`, accountRequest);
  }

  public static async deleteAccount(id: number) {
    return await ApiFactory.getInstance(this.getOptions()).delete(`/${id}`);
  }
}