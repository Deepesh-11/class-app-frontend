export type TeacherBrief = {
  id: number
  teacher_id: string
  name: string
}

export type CourseCreate = {
  course_name: string
  course_code: string
}

export type ClassroomBrief = {
  name: string
  section: string | null
  academic_year: string
}

export type CourseResponse = {
  id: number
  course_code: string
  course_name: string
}

export type CourseSession = {
  session_id: number
  title: string | null
  started_at: string | null
  attended: boolean
}

export type CourseDetailResponse = {
  id: number
  course_code: string
  course_name: string
  teacher_name: string | null

  total_sessions: number
  attended_sessions: number
  attendance_percentage: number

  sessions: CourseSession[]
}

export type CourseSessionStats = {
  id: number
  title: string
  started_at: string | null

  total_present: number
  total_students: number
  attendance_percentage: number
}

export type TeacherCourseDetailResponse = {
  id: number
  course_code: string
  course_name: string

  classroom_id: number
  classroom_name: string

  total_sessions: number
  active_session: boolean

  all_sessions: CourseSessionStats[]
}
