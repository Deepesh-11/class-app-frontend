export type UserInfo = {
  id: number
  name: string
  email: string | null
  is_active: boolean
  login_id: string | null
}

export type StudentCreate = {
  name: string,
  email?: string,
  roll_no?: string,
  phone?: string
}

export type StudentResponse = {
  id: number
  student_id: string
  user_id: number
  roll_no: string | null
  phone: string | null
  user: UserInfo
  created_at: string
  updated_at: string
}

export type StudentCreateResponse = {
  student_id: string
  default_password: string
  user: UserInfo
}
