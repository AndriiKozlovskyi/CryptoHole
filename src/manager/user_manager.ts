import { useRepo } from 'pinia-orm'
import store from '../store/store'
import User from '@/models/user_model'
import UserResponse from '@/dtos/responses/user_response'

export default class UserManager {
  protected static get repository() {
    return useRepo(User, store)
  }

  public static getFormatedUsers(users: Array<UserResponse>) {
    const _this = this
    return users.map((user) => {
        return _this.getFormatedUser(user)
      })
  }

  private static getFormatedUser(userResponse: UserResponse) {
    return {
      id: userResponse.id,
      username: userResponse.username,
    }
  }
}