"use client"

import Link from "next/link"
import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"

export default function TeacherHomePage() {
  const { courses, classrooms, sessions, loading, error } = useTeacherSelf()

  const totalSessions = courses.reduce((sum: number, c: any) => sum + (c.total_sessions || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-7 w-64 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="h-3 w-20 bg-gray-100 rounded mb-3" />
                <div className="h-5 w-28 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="h-3 w-32 bg-gray-100 rounded mb-2" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
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
          <p className="text-sm text-gray-500 mb-1">Teacher Portal</p>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Welcome back 👋</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Total Courses</p>
            <p className="text-xl font-medium text-gray-900">
              {courses.length > 0 ? `${courses.length} courses` : "—"}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Total Classrooms</p>
            <p className="text-xl font-medium text-gray-900">
              {classrooms.length > 0 ? `${classrooms.length} classrooms` : "—"}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Total Sessions</p>
            <p className="text-xl font-medium text-gray-900">
              {totalSessions > 0 ? `${totalSessions} sessions` : "—"}
            </p>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-gray-900">My Courses</h2>
            <Link href="/dashboard/teacher/courses" className="text-xs text-gray-500 hover:text-gray-900 transition">
              View all →
            </Link>
          </div>
          {courses.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <p className="text-sm text-gray-400">No courses assigned yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {courses.map((course: any) => (
                <Link
                  key={course.id}
                  href={`/dashboard/teacher/courses/${course.id}/sessions`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-medium text-gray-900">{course.name}</p>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                      {course.total_sessions} sessions
                    </span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <span className="text-xs text-gray-500">Students →</span>
                    <span className="text-xs text-gray-500">Sessions →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* My Classrooms */}
        <div>
          <h2 className="text-base font-medium text-gray-900 mb-4">My Classrooms</h2>
          {classrooms.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <p className="text-sm text-gray-400">No classrooms assigned yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {classrooms.map((classroom: any) => (
                <div key={classroom.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition">
                  <p className="text-sm font-medium text-gray-900">{classroom.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}