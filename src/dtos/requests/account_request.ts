import DepositRequest from "./deposit_request"
import RewardRequest from "./reward_request"
import WithdrawRequest from "./withdraw_request"

export default interface AccountRequest {
  name: string
  deposits: Array<DepositRequest>
  withdraws: Array<WithdrawRequest>
  rewards: Array<RewardRequest>
}
