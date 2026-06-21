export type ClassroomResponse = {
  id: number
  name: string
  section: string | null
  academic_year: string
}

export type StudentInClassroom = {
  id: number
  student_id: string
  roll_no: string | null
  name: string
  email: string | null
  is_active: boolean
}

export type CourseInClassroom = {
  id: number
  course_code: string
  course_name: string
  teacher_name: string | null
}

export type ClassroomDetail = {
  id: number
  name: string
  section: string | null
  academic_year: string
  students: StudentInClassroom[]
  courses: CourseInClassroom[]
}