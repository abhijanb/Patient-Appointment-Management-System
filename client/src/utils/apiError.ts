export interface ApiError {
  data?: {
    message?: string
    error?: unknown
  }
  error?: string
  status?: number
}
