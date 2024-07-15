import DepositResponse from "./deposit_response"
import RewardResponse from "./reward_response"
import WithdrawResponse from "./withdraw_response"

export default interface AccountResponse {
  id: number
  name: string
  deposits: Array<DepositResponse>
  withdraws: Array<WithdrawResponse>
  rewards: Array<RewardResponse>
}
