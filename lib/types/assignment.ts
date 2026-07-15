export interface AssignmentResponse {
  id: number
  course_id: number
  title: string
  description: string | null
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface SubmissionResponse {
  id: number
  assignment_id: number
  student_id: number
  content: string | null
  file_url: string | null
  file_name: string | null
  submitted_at: string
  grade: string | null
  feedback: string | null
  is_graded: boolean
}

export interface SubmissionWithStudent extends SubmissionResponse {
  student_name: string | null
  student_email: string | null
}