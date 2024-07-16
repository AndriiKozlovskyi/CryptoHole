import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import _ from 'lodash'
import SavedEventManager from './saved_event_manager'
import RewardApi from '@/api/reward_api'
import RewardRequest from '@/dtos/requests/reward_request'
import RewardResponse from '@/dtos/responses/reward_response'
import Reward from '@/models/reward_model'

export default class RewardManager {
  protected static get repository() {
    return useRepo(Reward, store)
  }

  static all(): Collection<Reward> {
    return this.repository.all()
  }

  static getById(id: number): Reward | null {
    return this.repository.find(id)
  }

  static async update(id: number, object: any) {
    const rest = _.omit(object, ['id'])
    const reward = await RewardApi.updateReward(id, rest)
    await RewardManager.loadAll(id);
    const rewardRequest: RewardRequest = reward.data;
    this.repository.where('id', id).update(rewardRequest)
  }

  static async loadAll(accountId: number) {
    const response = await RewardApi.allRewards(accountId)
    const income = this.getFormattedrewards(response.data)
    this.repository.save(income)
  }

  static async createReward(accountId: number, reward: RewardRequest) {
    const rewardResponse = await RewardApi.createReward(accountId, reward)
    const rewardResult = this.getFormattedreward(rewardResponse.data)

    await SavedEventManager.loadAll();
    this.repository.save(rewardResult)
  }

  static async deleteReward(id: number) {
    await RewardApi.deleteReward(id)
    SavedEventManager.loadAll();

    this.repository.destroy(id)
  }

  public static getFormattedrewards(incomes: Array<RewardResponse>) {
    const _this = this
    return incomes.map((income) => {
      return _this.getFormattedreward(income)
    })
  }

  private static getFormattedreward(rewardResponse: RewardResponse) {
    return {
      id: rewardResponse.id,
      account: rewardResponse.account,
      amount: rewardResponse.amount,
      date: rewardResponse.date,
    }
  }
}
