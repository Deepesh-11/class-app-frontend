"use client"

import { useState, useEffect, useCallback } from "react"
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api/course"
import { CourseCreateResponse } from "@/lib/types/course"

export function useCourses() {
  const [courses, setCourses] = useState<CourseCreateResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  async function add(data: Parameters<typeof createCourse>[0]) {
    const result = await createCourse(data)
    await fetch()
    return result
  }

  async function update(course_id: number, data: Parameters<typeof updateCourse>[1]) {
    await updateCourse(course_id, data)
    await fetch()
  }

  async function remove(course_id: number) {
    await deleteCourse(course_id)
    await fetch()
  }

  return { courses, loading, error, refresh: fetch, add, update, remove }
}