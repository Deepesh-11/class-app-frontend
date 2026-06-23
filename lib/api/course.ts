import { CourseResponse } from "@/lib/types/course"

const BASE = "/api/admin/courses"

export async function getCourses(): Promise<CourseResponse[]> {
  const res = await fetch(BASE, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch courses")
  return res.json()
}

export async function getCourse(course_id: number): Promise<CourseResponse> {
  const res = await fetch(`${BASE}/${course_id}`, { credentials: "include" })
  if (!res.ok) throw new Error("Course not found")
  return res.json()
}

export async function createCourse(data: {
  course_code: string
  course_name: string
}): Promise<CourseResponse> {
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
      : err.detail ?? "Failed to create course"
    throw new Error(message)
  }
  return res.json()
}

export async function updateCourse(
  course_id: number,
  data: { course_name?: string;  course_code?: string }
): Promise<CourseResponse> {
  const res = await fetch(`${BASE}/${course_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to update coure"
    throw new Error(message)
  }
  return res.json()
}

export async function deleteCourse(course_id: number): Promise<void> {
  const res = await fetch(`${BASE}/${course_id}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete course")
}