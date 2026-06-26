import { ClassSessionResponse } from "@/lib/types/attendance"
import { TeacherCourseDetailResponse } from "@/lib/types/course"
const BASE = "/api"

export async function getMyCoursesTeacher() {
  const res = await fetch(`${BASE}/teacher/me/courses`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch courses")
  return res.json()
}

export async function getTeacherCourseDetail(
  courseId: number
): Promise<TeacherCourseDetailResponse> {
  const res = await fetch(
    `${BASE}/teacher/me/courses/${courseId}`,
    {
      credentials: "include",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch course details")
  }

  return res.json()
}

export async function getMyClassroomsTeacher() {
  const res = await fetch(`${BASE}/teacher/me/classroom`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch classrooms")
  return res.json()
}

export async function getClassroomStudents(classroomId: number) {
  const res = await fetch(`${BASE}/teacher/me/classroom/${classroomId}/students`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch students")
  return res.json()
}

export async function getCourseSessions(courseId: number) {
  const res = await fetch(`${BASE}/teacher/me/courses/${courseId}/sessions`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch sessions")
  return res.json()
}

export async function getAttendanceSessions() {
  const res = await fetch(`${BASE}/attendance/sessions`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch sessions")
  return res.json()
}

export async function startAttendance(course_id: number): Promise<ClassSessionResponse> {
  const res = await fetch(`${BASE}/attendance/courses/${course_id}/start`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Failed to start attendance")
  }
  return res.json()
}

export async function endSession(session_id: number): Promise<ClassSessionResponse> {
  const res = await fetch(`${BASE}/attendance/sessions/${session_id}/end`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Failed to end session")
  }
  return res.json()
}