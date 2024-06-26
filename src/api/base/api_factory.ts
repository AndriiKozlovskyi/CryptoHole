import type BaseApi from './base_api'
import AxiosApi from './axios_api'
import type ApiOptions from './api_options'

class ApiFactory {
  getInstance(apiOptions: ApiOptions | undefined = undefined): BaseApi {
    return new AxiosApi(apiOptions)
  }
}

export default new ApiFactory()
