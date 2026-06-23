import { TeacherResponse, TeacherCreateResponse } from "@/lib/types/teacher"

const BASE = "/api/admin/teachers/"

export async function getTeachers(): Promise<TeacherResponse[]> {
  const res = await fetch(BASE, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch teachers")
  return res.json()
}

export async function getTeacher(teacher_id: string): Promise<TeacherResponse> {
  const res = await fetch(`${BASE}/${teacher_id}`, { credentials: "include" })
  if (!res.ok) throw new Error("Student not found")
  return res.json()
}

export async function createTeacher(data: {
  name: string
  email?: string
  department?: string
  phone?: string
}): Promise<TeacherCreateResponse> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    // FastAPI validation errors return detail as an array of objects
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to create teacher"
    throw new Error(message)
  }
  return res.json()
}

export async function updateTeacher(
  teacher_id: string,
  data: { name?: string; email?: string; department?: string; phone?: string; is_active?: boolean }
): Promise<TeacherResponse> {
  const res = await fetch(`${BASE}/${teacher_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update teacher")
  return res.json()
}

export async function deleteTeacher(teacher_id: string): Promise<void> {
  const res = await fetch(`${BASE}/${teacher_id}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete teacher")
}
