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
  class_id: number | null
  teacher_id: number | null
}

export type CourseCreateResponse = {
  id: number
  course_code: string
  course_name: string
}

export type CourseDetailResponse = {
  id: number
  course_code: string
  course_name: string
  classroom: ClassroomBrief | null
  teacher: TeacherBrief | null
}
