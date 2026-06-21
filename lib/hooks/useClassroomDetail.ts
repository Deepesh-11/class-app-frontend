"use client"

import { useState, useEffect, useCallback } from "react"
import { getClassroom, enrollStudent, removeStudent, assignCourse, unassignCourse } from "@/lib/api/classroom"
import { ClassroomDetail } from "@/lib/types/classroom"

export function useClassroomDetail(classroom_id: number) {
    const [classroom, setClassroom] = useState<ClassroomDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetch = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getClassroom(classroom_id)
            setClassroom(data)
        } catch (e) {
            setError((e as Error).message)
        } finally {
            setLoading(false)
        }
    }, [classroom_id])

    useEffect(() => { fetch() }, [fetch])

    async function enroll(data: Parameters<typeof enrollStudent>[1]) {
        await enrollStudent(classroom_id, data)
        await fetch()
    }

    async function kick(student_id: string) {
        await removeStudent(classroom_id, student_id)
        await fetch()
    }

    async function assign(data: Parameters<typeof assignCourse>[1]) {
        await assignCourse(classroom_id, data)
        await fetch()
    }

    async function unassign(course_id: number) {
        await unassignCourse(classroom_id, course_id)
        await fetch()
    }

    return { classroom, loading, error, refresh: fetch, enroll, kick, assign, unassign }
}