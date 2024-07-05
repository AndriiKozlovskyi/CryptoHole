import AccountResponse from "./account_response";

export default interface SavedEventResponse {
    id: number;
    name: string;
    event: number;
    status: string;
    accounts: AccountResponse[];
    orderNumber: number;
    startDate: string;
    endDate: string;
}