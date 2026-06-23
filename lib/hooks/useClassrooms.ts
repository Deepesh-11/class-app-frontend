"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getClassrooms, createClassroom, updateClassroom, deleteClassroom,
} from "@/lib/api/classroom"
import { ClassroomResponse } from "@/lib/types/classroom"

export function useClassrooms() {
  const [classrooms, setClassrooms] = useState<ClassroomResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getClassrooms()
      setClassrooms(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  async function add(data: Parameters<typeof createClassroom>[0]) {
    const result = await createClassroom(data)
    await fetch()
    return result
  }

  async function update(classroom_id: number, data: Parameters<typeof updateClassroom>[1]) {
    await updateClassroom(classroom_id, data)
    await fetch()
  }

  async function remove(classroom_id: number) {
    await deleteClassroom(classroom_id)
    await fetch()
  }

  return { classrooms, loading, error, refresh: fetch, add, update, remove }
}