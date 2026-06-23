"use client"
import { useState, useEffect, useCallback } from "react"
import {
  getMyCoursesTeacher,
  getMyClassroomsTeacher,
  getAttendanceSessions,
  createAttendanceSession,
  startSession,
  endSession,
  getClassroomStudents,
  getCourseSessions,
} from "@/lib/api/teacher-self"

export function useTeacherSelf() {
  const [courses, setCourses] = useState<any[]>([])
  const [classrooms, setClassrooms] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [coursesData, classroomsData, sessionsData] = await Promise.all([
        getMyCoursesTeacher(),
        getMyClassroomsTeacher(),
        getAttendanceSessions(),
      ])
      setCourses(coursesData)
      setClassrooms(classroomsData)
      setSessions(sessionsData)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  async function createSession(data: { topic: string; course_id: number; date: string }) {
    await createAttendanceSession(data)
    await fetchAll()
  }

  async function start(sessionId: number) {
    await startSession(sessionId)
    await fetchAll()
  }

  async function end(sessionId: number) {
    await endSession(sessionId)
    await fetchAll()
  }

  async function getStudents(classroomId: number) {
    return getClassroomStudents(classroomId)
  }

  async function getSessions(courseId: number) {
    return getCourseSessions(courseId)
  }

  return {
    courses,
    classrooms,
    sessions,
    loading,
    error,
    refresh: fetchAll,
    createSession,
    start,
    end,
    getStudents,
    getSessions,
  }
}