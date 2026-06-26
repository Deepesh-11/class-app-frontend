"use client"
import { useState, useEffect, useCallback } from "react"
import {
  getMyCoursesTeacher,
  getMyClassroomsTeacher,
  getAttendanceSessions,
  startAttendance as startAttendanceApi,
  endSession,
  getClassroomStudents,
  getCourseSessions,
  getTeacherCourseDetail
} from "@/lib/api/teacher-self"

export function useTeacherSelf() {
  const [courses, setCourses] = useState<any[]>([])
  const [classrooms, setClassrooms] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startingCourseId, setStartingCourseId] = useState<number | null>(null)
  const [endingSessionId, setEndingSessionId] = useState<number | null>(null)

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


  async function startAttendance(courseId: number) {
    setStartingCourseId(courseId)
    try {
      const session = await startAttendanceApi(courseId)
      const sessionsData = await getAttendanceSessions()
      setSessions(sessionsData)
      return session
    } catch (e) {
      setError((e as Error).message)
      return null
    } finally {
      setStartingCourseId(null)
    }
  }

  async function end(sessionId: number) {
    setEndingSessionId(sessionId)
    try {
      await endSession(sessionId)

      const sessionsData = await getAttendanceSessions()
      setSessions(sessionsData)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setEndingSessionId(null)
    }
  }


  async function getStudents(classroomId: number) {
    return getClassroomStudents(classroomId)
  }

  async function getSessions(courseId: number) {
    return getCourseSessions(courseId)
  }

  async function getTeacherCourse(courseId: number) {
    return getTeacherCourseDetail(courseId) 
  }

  return {
    courses,
    classrooms,
    sessions,
    loading,
    error,
    refresh: fetchAll,
    startingCourseId,
    startAttendance,
    end,
    getStudents,
    getSessions,
    getTeacherCourse
  }
}