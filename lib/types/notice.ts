export type TargetRole = "all" | "student" | "teacher"

export type NoticeResponse = {
  id: number
  title: string
  body: string
  target_role: TargetRole
  is_active: boolean
  created_at: string
}