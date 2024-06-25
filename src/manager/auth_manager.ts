import authApi from '@/api/auth_api'
import BaseApiResponse from '@/dtos/responses/base_api_response'

export default class AuthManager {
  static getToken() {
    return localStorage.getItem('token')
  }

  static setToken(token: string) {
    localStorage.setItem('token', token)
  }

  static async getTokenFromApi(identifier: string, password: string) {
    try {
      const res = await authApi.login({
        identifier,
        password
      })

      return res.data.token
    } catch (error) {
      console.error(error)
      throw new Error('Problems retrieving data from API')
    }
  }

  static async login(identifier: string, password: string) {
    if (!identifier || !password) {
      throw new Error('username or password is empty')
    }
    const token = await this.getTokenFromApi(identifier, password)
    this.setToken(token)
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static async register(username: string, email: string, password: string): Promise<BaseApiResponse<String>> {
    if (!username || !password || !email) {
      throw new Error('Not all credentials are provided')
    }

    return await authApi.register({
      username,
      email,
      password
    })
  }

  static async isTokenValid() {
    try {
      const token = this.getToken()
      return !!token && (await authApi.validateToken(token))
    } catch (error) {
      console.error('isTokenValid#ERROR', error)
      return false
    }
  }
}
