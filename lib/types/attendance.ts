export type ClassSessionResponse = {
  id: number
  course_id: number
  title: string | null
  is_active: boolean
  started_at: string | null
  ended_at: string | null
  created_at: string
}


export type AttendanceHistory = {
  session_id: number
  course_id: number
  course_code: string
  course_name: string
  session_title: string | null
  session_date: string | null
  marked_at: string | null
}