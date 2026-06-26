"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"
import { TeacherCourseDetailResponse } from "@/lib/types/course"
import { formatDate } from "@/lib/utils/utils"

export default function TeacherCourseSessionsPage() {
  const { course_id } = useParams()
  const { getTeacherCourse } = useTeacherSelf()
  const [teacherCourse, setTeacherCourse] = useState<TeacherCourseDetailResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const course = await getTeacherCourse(Number(course_id))
        console.log(course)
        setTeacherCourse(course)
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

        {/* Course Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {teacherCourse?.course_code}
              </p>

              <h1 className="mt-1 text-2xl font-semibold text-gray-900">
                {teacherCourse?.course_name}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {`${teacherCourse?.total_sessions} sessions created`}
              </p>
            </div>
          </div>
        </div>



        {/* Resources */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Notes */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-medium text-gray-900">
                Notes & Materials
              </h2>

              <Link href={`/dashboard/teacher/courses/${course_id}/notes`} className="text-sm text-gray-900 hover:underline">
                + Upload
              </Link>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs text-gray-500">
                    File
                  </th>

                  <th className="text-left px-5 py-3 text-xs text-gray-500">
                    Uploaded
                  </th>

                  <th className="text-left px-5 py-3 text-xs text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    id: 1,
                    title: "Week 1 Notes.pdf",
                    uploaded: "2026-06-20",
                  },
                  {
                    id: 2,
                    title: "Chapter 2 Slides.pptx",
                    uploaded: "2026-06-22",
                  },
                ].map((note) => (
                  <tr
                    key={note.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {note.title}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {note.uploaded}
                    </td>

                    <td className="px-5 py-4">
                      <button className="text-sm text-gray-500 hover:text-gray-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Assignments */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-medium text-gray-900">
                Assignments
              </h2>

              <Link href={`/dashboard/teacher/courses/${course_id}/assignments`} className="text-sm text-gray-900 hover:underline">
                + Create
              </Link>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs text-gray-500">
                    Title
                  </th>

                  <th className="text-left px-5 py-3 text-xs text-gray-500">
                    Due Date
                  </th>

                  <th className="text-left px-5 py-3 text-xs text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    id: 1,
                    title: "Algebra Worksheet",
                    due: "2026-06-30",
                    status: "Active",
                  },
                  {
                    id: 2,
                    title: "Linear Equations Quiz",
                    due: "2026-07-05",
                    status: "Draft",
                  },
                ].map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {assignment.title}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {assignment.due}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${assignment.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                          }`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Sessions</h1>
              <p className="text-sm text-gray-500 mt-1">
                {`${teacherCourse?.total_sessions} sessions`}
              </p>
            </div>
          </div>
        </div>

        {teacherCourse?.total_sessions == 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400 mb-4">No sessions created yet.</p>
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
                {teacherCourse?.all_sessions.map((session: any, i: number) => (
                  <tr key={session?.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-5 py-4 text-gray-600">{formatDate(session?.started_at)}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">{session.title}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${session.total_students > 0 &&
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