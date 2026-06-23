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
  const res = await fetch(`${BASE}/attendance/my-records`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch attendance records")
  return res.json()
}

export async function getActiveSession() {
  const res = await fetch(`${BASE}/attendance/sessions/active`, { credentials: "include" })
  if (!res.ok) return null
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