import AuthManager from '@/manager/auth_manager'

export default interface ApiOptions {
  baseUrl: string | undefined
  useAuth: boolean
  withCredentials: boolean
  getAccessToken: () => Promise<string | null>
}

export const defaultApiOptions: ApiOptions = {
  withCredentials: true,
  baseUrl: 'http://localhost:8080/api/v1',
  useAuth: true,
  getAccessToken: async () => AuthManager.getToken()
}
