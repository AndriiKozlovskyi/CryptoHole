import type LoginResponse from '@/dtos/responses/login_response'
import type BaseApiResponse from '@/dtos/responses/base_api_response'
import ApiFactory from '@/api/base/api_factory'
import ApiOptions, { defaultApiOptions } from '@/api/base/api_options'

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

  async usernameExists(username: string): Promise<BaseApiResponse<Boolean>> {
    return await ApiFactory.getInstance(this.getOptions()).get(
      `/checkUsername?username=${username}`
    )
  }

  async emailExists(email: string): Promise<BaseApiResponse<Boolean>> {
    return await ApiFactory.getInstance(this.getOptions()).get(`/checkEmail?email=${email}`)
  }

  async register(body: any): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).post('/register', body)
  }

  async validateToken(token: any) {
    return await ApiFactory.getInstance(this.getOptions()).post('/isTokenExpired', { token })
  }
}

export default new AuthApi()
