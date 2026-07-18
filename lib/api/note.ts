import { NoteResponse } from "@/lib/types/note"

const BASE = "/api"

// ---------- Notes ----------

export async function getNotes(
  courseId: number | string
): Promise<NoteResponse[]> {
  const res = await fetch(`${BASE}/notes/course/${courseId}`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch notes")
  return res.json()
}

export async function getMyNotes(): Promise<NoteResponse[]> {
  const res = await fetch(`${BASE}/notes/my`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch your notes")
  return res.json()
}

export async function uploadNote(
  courseId: number | string,
  data: { title: string; file: File }
): Promise<NoteResponse> {
  const formData = new FormData()
  formData.append("course_id", String(courseId))
  formData.append("title", data.title)
  formData.append("file", data.file)

  const res = await fetch(`${BASE}/notes`, {
    method: "POST",
    credentials: "include",
    body: formData, // no Content-Type header — browser sets multipart boundary
  })
  if (!res.ok) {
    const err = await res.json()
    const message = Array.isArray(err.detail)
      ? err.detail.map((e: any) => e.msg).join(", ")
      : err.detail ?? "Failed to upload note"
    throw new Error(message)
  }
  return res.json()
}

export async function deleteNote(noteId: number | string): Promise<void> {
  const res = await fetch(`${BASE}/notes/${noteId}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete note")
}

export function getNoteDownloadUrl(noteId: number | string): string {
  return `${BASE}/notes/${noteId}/download`
}