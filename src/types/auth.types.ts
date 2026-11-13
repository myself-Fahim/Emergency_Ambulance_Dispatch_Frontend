export type LoginResponse = {
  success: boolean
  statusCode: number
  message?: string
  data: any
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginError = {
  success: false
  statusCode: number
  name?: string
  message: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}
