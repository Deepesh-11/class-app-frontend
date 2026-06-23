"use client"

import Link from "next/link"
import { useStudentSelf } from "@/lib/hooks/useStudentSelf"

export default function StudentCoursesPage() {
  const { courses, loading, error } = useStudentSelf()

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
          <Link href="/dashboard/student" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Back to home
          </Link>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mt-2">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">All courses in your classroom.</p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400">No courses found.</p>
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
                <p className="text-xs text-gray-500">{course.teacher}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}