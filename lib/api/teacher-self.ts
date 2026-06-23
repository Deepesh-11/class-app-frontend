const BASE = "/api"

export async function getMyCoursesTeacher() {
  const res = await fetch(`${BASE}/teacher/me/courses`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch courses")
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

export async function createAttendanceSession(data: {
  topic: string
  course_id: number
  date: string
}) {
  const res = await fetch(`${BASE}/attendance/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create session")
  return res.json()
}

export async function startSession(sessionId: number) {
  const res = await fetch(`${BASE}/attendance/sessions/${sessionId}/start`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to start session")
  return res.json()
}

export async function endSession(sessionId: number) {
  const res = await fetch(`${BASE}/attendance/sessions/${sessionId}/end`, {
    method: "POST",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to end session")
  return res.json()
}