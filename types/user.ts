export type Role = "admin" | "teacher" | "student"

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  role: Role
  is_active: boolean
}

export type LoginPayload = {
  email: string
  password: string
}

export type OtpPayload = {
  email: string
  otp: string
}

export type AuthResponse = {
  access_token: string
  token_type: string
  user: User
}