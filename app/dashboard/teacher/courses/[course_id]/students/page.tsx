"use client"

import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function TeacherCourseStudentsPage() {
  const { course_id } = useParams()
  const { getStudents } = useTeacherSelf()
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getStudents(Number(course_id))
        setStudents(data)
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
                <div className="w-8 h-8 bg-gray-100 rounded-full" />
                <div>
                  <div className="h-3 w-32 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
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
          <Link href="/dashboard/teacher" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Back to courses
          </Link>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mt-2">Students</h1>
          <p className="text-sm text-gray-500 mt-1">
            {students.length} student{students.length !== 1 ? "s" : ""} enrolled in this course.
          </p>
        </div>

        {students.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400">No students enrolled yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">#</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Phone</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: any, i: number) => (
                  <tr key={student.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                          {student.first_name?.[0]}{student.last_name?.[0]}
                        </div>
                        <span className="font-medium text-gray-900">
                          {student.first_name} {student.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{student.email}</td>
                    <td className="px-5 py-4 text-gray-600">{student.phone}</td>
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