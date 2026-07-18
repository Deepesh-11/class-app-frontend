"use client"

import { useState, useEffect, useCallback } from "react"
import { getActiveSession } from "@/lib/api/student-self"

type ActiveSession = {
  id: number
  title: string
  course_id: number
  course_name: string
}


export function useActiveSession() {
  const [activeSession, setActiveSession] =   useState<ActiveSession | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchActiveSession = useCallback(async () => {
    try {
      const session = await getActiveSession()
      setActiveSession(session)
    } catch {
      setActiveSession(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActiveSession()

    const interval = setInterval(
      fetchActiveSession,
      10000
    )

    return () => clearInterval(interval)
  }, [fetchActiveSession])

  return {
    activeSession,
    loading,
    refresh: fetchActiveSession,
  }
}