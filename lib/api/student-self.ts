import { CourseDetailResponse } from "@/lib/types/course"
const BASE = "/api"

export async function getMyClassroom() {
  const res = await fetch(`${BASE}/student/me/classroom`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch classroom")
  return res.json()
}

export async function getMyCourses() {
  const res = await fetch(`${BASE}/student/me/courses`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch courses")
  return res.json()
}

export async function getMyAttendance() {
  const res = await fetch(`${BASE}/student/me/attendance`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch attendance")
  return res.json()
}

export async function getMyAttendanceRecords() {
  const res = await fetch(`${BASE}/student/me/my-records`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch attendance records")
  return res.json()
}

export async function getActiveSession() {
  const res = await fetch(`${BASE}/attendance/sessions/active`, { credentials: "include" })
  if (!res.ok) return null
  return res.json()
}

export async function getCourseDetail(
  courseId: string | number
): Promise<CourseDetailResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/student/me/courses/${courseId}`,
    {
      credentials: "include",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch course")
  }

  return res.json()
}

export async function joinSession(sessionId: number) {
  const res = await fetch(`${BASE}/attendance/sessions/${sessionId}/join`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to join session")
  return res.json()
}

export async function leaveSession(sessionId: number) {
  const res = await fetch(`${BASE}/attendance/sessions/${sessionId}/leave`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Failed to leave session")
  }
  return res.json()
}