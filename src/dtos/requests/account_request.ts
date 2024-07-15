import DepositRequest from "./deposit_request"
import IncomeRequest from "./income_request"

export default interface AccountRequest {
  name: string
  deposits: Array<DepositRequest>
  incomes: Array<IncomeRequest>
}
