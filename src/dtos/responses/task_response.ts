export default interface TaskResponse {
  id: number
  header: string
  description: string
  completed: boolean
  account: string | null
}
