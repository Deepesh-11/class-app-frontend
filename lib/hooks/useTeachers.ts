"use client"

import { useState, useEffect, useCallback } from "react"
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from "@/lib/api/teacher"
import { TeacherResponse } from "@/lib/types/teacher"

export function useTeachers() {
  const [teachers, setTeachers] = useState<TeacherResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTeachers()
      setTeachers(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  async function add(data: Parameters<typeof createTeacher>[0]) {
    const result = await createTeacher(data)
    await fetch()
    return result
  }

  async function update(teacher_id: string, data: Parameters<typeof updateTeacher>[1]) {
    await updateTeacher(teacher_id, data)
    await fetch()
  }

  async function remove(teacher_id: string) {
    await deleteTeacher(teacher_id)
    await fetch()
  }

  return { teachers, loading, error, refresh: fetch, add, update, remove }
}
