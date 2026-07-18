import {
    AssignmentResponse,
    SubmissionResponse,
    SubmissionWithStudent,
} from "@/lib/types/assignment"

const BASE = "/api"

// ---------- Assignments ----------

export async function getAssignments(
  courseId: number | string
): Promise<AssignmentResponse[]> {
  const res = await fetch(`${BASE}/courses/${courseId}/assignments`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch assignments")
  return res.json()
}

export async function getAssignment(
  courseId: number | string,
  assignmentId: number | string
): Promise<AssignmentResponse> {
  const res = await fetch(
    `${BASE}/courses/${courseId}/assignments/${assignmentId}`,
    { credentials: "include" }
  )
  if (!res.ok) throw new Error("Assignment not found")
  return res.json()
}

export async function createAssignment(
  courseId: number | string,
  data: { title: string; description?: string; due_date?: string }
): Promise<AssignmentResponse> {
  const res = await fetch(`${BASE}/courses/${courseId}/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to create assignment"
    throw new Error(message)
  }
  return res.json()
}

export async function updateAssignment(
  courseId: number | string,
  assignmentId: number | string,
  data: { title?: string; description?: string; due_date?: string }
): Promise<AssignmentResponse> {
  const res = await fetch(
    `${BASE}/courses/${courseId}/assignments/${assignmentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }
  )
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to update assignment"
    throw new Error(message)
  }
  return res.json()
}

export async function deleteAssignment(
  courseId: number | string,
  assignmentId: number | string
): Promise<void> {
  const res = await fetch(
    `${BASE}/courses/${courseId}/assignments/${assignmentId}`,
    { method: "DELETE", credentials: "include" }
  )
  if (!res.ok) throw new Error("Failed to delete assignment")
}

// ---------- Submissions ----------

export async function submitAssignment(
  assignmentId: number | string,
  data: { content?: string; file?: File | null }
): Promise<SubmissionResponse> {
  const formData = new FormData()
  if (data.content) formData.append("content", data.content)
  if (data.file) formData.append("file", data.file)

  const res = await fetch(`${BASE}/assignments/${assignmentId}/submissions`, {
    method: "POST",
    credentials: "include",
    body: formData, // no Content-Type header — browser sets multipart boundary
  })
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to submit assignment"
    throw new Error(message)
  }
  return res.json()
}

export async function getSubmissions(
  assignmentId: number | string
): Promise<SubmissionWithStudent[]> {
  const res = await fetch(`${BASE}/assignments/${assignmentId}/submissions`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch submissions")
  return res.json()
}

export async function getMySubmission(
  assignmentId: number | string
): Promise<SubmissionResponse | null> {
  const res = await fetch(
    `${BASE}/assignments/${assignmentId}/submissions/me`,
    { credentials: "include" }
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch your submission")
  return res.json()
}

export async function gradeSubmission(
  submissionId: number | string,
  data: { grade?: string; feedback?: string }
): Promise<SubmissionResponse> {
  const res = await fetch(`${BASE}/assignments/submissions/${submissionId}/grade`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to grade submission"
    throw new Error(message)
  }
  return res.json()
}

export async function deleteSubmission(
  submissionId: number | string
): Promise<void> {
  const res = await fetch(`${BASE}/assignments/submissions/${submissionId}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete submission")
}