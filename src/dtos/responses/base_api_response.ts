export default interface BaseApiResponse<T> {
  data: T
  code: number
}
