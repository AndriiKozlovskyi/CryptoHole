import authApi from '@/api/auth_api'

export default class AuthManager {
  static getToken() {
    return localStorage.getItem('token')
  }

  static setToken(token: string) {
    localStorage.setItem('token', token)
  }

  static async getTokenFromApi(username: string, password: string) {
    try {
      const res = await authApi.login({
        username,
        password
      })

      return res.data.token
    } catch (error) {
      console.error(error)
      throw new Error('Problems retrieving data from API')
    }
  }

  static async login(username: string, password: string) {
    if (!username || !password) {
      throw new Error('username or password is empty')
    }
    const token = await this.getTokenFromApi(username, password)
    this.setToken(token)
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static async register(username: string, password: string) {
    if (!username || !password) {
      throw new Error('Not all credentials are provided')
    }

    await authApi.register({
      username,
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
