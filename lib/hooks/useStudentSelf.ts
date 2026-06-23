"use client"
import { useState, useEffect, useCallback } from "react"
import {
  getMyClassroom,
  getMyCourses,
  getMyAttendance,
  getMyAttendanceRecords,
  getActiveSession,
  joinSession,
} from "@/lib/api/student-self"

export function useStudentSelf() {
  const [classroom, setClassroom] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [attendance, setAttendance] = useState<any[]>([])
  const [records, setRecords] = useState<any[]>([])
  const [activeSession, setActiveSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [classroomData, coursesData, attendanceData, recordsData, sessionData] =
        await Promise.all([
          getMyClassroom(),
          getMyCourses(),
          getMyAttendance(),
          getMyAttendanceRecords(),
          getActiveSession(),
        ])
      setClassroom(classroomData)
      setCourses(coursesData)
      setAttendance(attendanceData)
      setRecords(recordsData)
      setActiveSession(sessionData)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  async function join(sessionId: number) {
    await joinSession(sessionId)
    await fetchAll()
  }

  return {
    classroom,
    courses,
    attendance,
    records,
    activeSession,
    loading,
    error,
    refresh: fetchAll,
    join,
  }
}