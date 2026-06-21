export type ApiResponse<T> = {
  data: T
  message: string
  status: number
}

export type ApiError = {
  detail: string
  status: number
}