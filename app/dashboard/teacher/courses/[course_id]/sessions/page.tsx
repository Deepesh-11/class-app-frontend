"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"

export default function TeacherCourseSessionsPage() {
  const { course_id } = useParams()
  const { getSessions } = useTeacherSelf()
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSessions(Number(course_id))
        setSessions(data)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [course_id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-7 w-48 bg-gray-200 rounded mb-8" />
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
                <div className="h-3 w-24 bg-gray-100 rounded" />
                <div className="h-3 w-32 bg-gray-100 rounded" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <Link href="/dashboard/teacher/courses" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Back to courses
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Sessions</h1>
              <p className="text-sm text-gray-500 mt-1">
                {sessions.length} session{sessions.length !== 1 ? "s" : ""} for this course.
              </p>
            </div>
            <Link
              href="/dashboard/teacher/attendance"
              className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.99] transition flex items-center"
            >
              + New session
            </Link>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400 mb-4">No sessions created yet.</p>
            <Link
              href="/dashboard/teacher/attendance"
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              Create your first session →
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">#</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Topic</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session: any, i: number) => (
                  <tr key={session.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-5 py-4 text-gray-600">{session.date}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">{session.topic}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        session.total_students > 0 &&
                        session.total_present / session.total_students >= 0.75
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {session.total_present}/{session.total_students} present
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}