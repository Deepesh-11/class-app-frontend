"use client"

import Link from "next/link"
import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"

export default function TeacherClassroomsPage() {
  const {
    classrooms,
    loading,
    error,
  } = useTeacherSelf()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Classrooms
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Classrooms where you currently teach.
          </p>
        </div>

        {classrooms.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400">
              No classrooms assigned.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classrooms.map((classroom) => (
              <Link
                key={classroom.id}
                href={`/dashboard/teacher/classrooms/${classroom.id}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {classroom.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Section {classroom.section}
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {classroom.academic_year}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Classroom ID #{classroom.id}
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}