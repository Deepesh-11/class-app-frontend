"use client"

import { useEffect, useState } from "react"
import { getCourseDetail } from "@/lib/api/student-self"
import { CourseDetailResponse } from "@/lib/types/course"

export function useCourseDetail(courseId: string) {
  const [course, setCourse] = useState<CourseDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCourseDetail(courseId)
        setCourse(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        )
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      load()
    }
  }, [courseId])

  return {
    course,
    loading,
    error,
  }
}