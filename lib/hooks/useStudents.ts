"use client"

import { useState, useEffect, useCallback } from "react"
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/lib/api/student"
import { StudentResponse } from "@/lib/types/student"

export function useStudents() {
  const [students, setStudents] = useState<StudentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getStudents()
      setStudents(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  async function add(data: Parameters<typeof createStudent>[0]) {
    const result = await createStudent(data)
    await fetch()
    return result
  }

  async function update(student_id: string, data: Parameters<typeof updateStudent>[1]) {
    await updateStudent(student_id, data)
    await fetch()
  }

  async function remove(student_id: string) {
    await deleteStudent(student_id)
    await fetch()
  }

  return { students, loading, error, refresh: fetch, add, update, remove }
}
