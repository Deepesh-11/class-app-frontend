import { deleteNote, getNotes, uploadNote } from "@/lib/api/note"
import { NoteResponse } from "@/lib/types/note"
import { useCallback, useEffect, useState } from "react"

export function useNotes(courseId: number | string) {
  const [notes, setNotes] = useState<NoteResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getNotes(courseId)
      setNotes(data)
    } catch (err: any) {
      setError(err.message ?? "Failed to load notes")
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const upload = useCallback(
    async (data: { title: string; file: File }) => {
      const created = await uploadNote(courseId, data)
      setNotes((prev) => [created, ...prev])
      return created
    },
    [courseId]
  )

  const remove = useCallback(async (noteId: number | string) => {
    await deleteNote(noteId)
    setNotes((prev) => prev.filter((n) => n.id !== noteId))
  }, [])

  return { notes, loading, error, refresh, upload, remove }
}