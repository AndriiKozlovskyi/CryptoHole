export default interface EventRequest {
  name: string
  tagsIds: number[]
  expenses: number,
  participants: number,
  src: string
  startDate: string
  endDate: string
}
