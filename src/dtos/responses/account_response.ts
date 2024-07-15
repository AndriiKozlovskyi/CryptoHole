import DepositResponse from "./deposit_response"
import IncomeResponse from "./income_response"

export default interface AccountResponse {
  id: number
  name: string
  deposits: Array<DepositResponse>
  incomes: Array<IncomeResponse>
}
