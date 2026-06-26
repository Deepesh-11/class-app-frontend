import { StudentResponse, StudentCreateResponse } from "@/lib/types/student"

const BASE = "/api/admin/students/"

export async function getStudents(): Promise<StudentResponse[]> {
  const res = await fetch(BASE, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch students")
  return res.json()
}

export async function getStudent(student_id: string): Promise<StudentResponse> {
  const res = await fetch(`${BASE}/${student_id}`, { credentials: "include" })
  if (!res.ok) throw new Error("Student not found")
  return res.json()
}

export async function createStudent(data: {
  name: string
  email?: string
  roll_no?: string
  phone?: string
}): Promise<StudentCreateResponse> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to create student"
    throw new Error(message)
  }
  return res.json()
}

export async function updateStudent(
  student_id: string,
  data: { name?: string; email?: string; phone?: string; is_active?: boolean }
): Promise<StudentResponse> {
  const res = await fetch(`${BASE}/${student_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update student")
  return res.json()
}

export async function deleteStudent(student_id: string): Promise<void> {
  const res = await fetch(`${BASE}/${student_id}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete student")
}
