export type UserInfo = {
  id: number
  name: string
  email: string | null
  is_active: boolean
  login_id: string | null
}

export type TeacherCreate = {
  name: string,
  email?: string,
  department?: string,
  phone?: string
}

export type TeacherResponse = {
  id: number
  teacher_id: string
  email: string
  department: string | null
  phone: string | null
  user: UserInfo
  created_at: string
  updated_at: string

}

export type TeacherCreateResponse = {
  teacher_id: string
  default_password: string
  user: UserInfo
}
