"use client"

import Link from "next/link"
import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"

export default function TeacherCoursesPage() {
  const { courses, loading, error } = useTeacherSelf()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-7 w-48 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="h-3 w-32 bg-gray-100 rounded mb-2" />
                <div className="h-3 w-20 bg-gray-100 rounded mb-4" />
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
          <Link href="/dashboard/teacher" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Back to home
          </Link>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mt-2">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">All courses assigned to you.</p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400">No courses assigned yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {courses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-gray-900">{course.name}</p>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                    {course.total_sessions} sessions
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/dashboard/teacher/courses/${course.id}/students`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition"
                  >
                    Students
                  </Link>
                  <Link
                    href={`/dashboard/teacher/courses/${course.id}/sessions`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition"
                  >
                    Sessions
                  </Link>
                  <Link
                    href={`/dashboard/teacher/courses/${course.id}/assignments`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition"
                  >
                    Assignments
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}