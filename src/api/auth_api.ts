import type LoginResponse from '@/dtos/responses/login_response'
import type BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from './api_factory'
import ApiOptions, { defaultApiOptions } from '@/api/api_options'

class AuthApi {
  baseUrl = 'http://localhost:8080/api/v1/auth'

  getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: false
    }
  }

  async login(body: any): Promise<BaseApiResponse<LoginResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post('/login', body)
  }

  async register(body: any): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).post('/register', body)
  }

  async validateToken(token: any) {
    return await ApiFactory.getInstance(this.getOptions()).post('/isTokenExpired', { token })
  }
}

export default new AuthApi()
