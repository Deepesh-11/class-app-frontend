"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export default function TeacherAssignmentsPage() {
  const { course_id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/teacher/courses"
            className="text-xs text-gray-400 hover:text-gray-700 transition"
          >
            ← Back to courses
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Assignments</h1>
              <p className="text-sm text-gray-500 mt-1">Manage assignments for this course.</p>
            </div>
            <button
              disabled
              className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
            >
              + New assignment
            </button>
          </div>
        </div>

        {/* Coming soon */}
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">Assignments coming soon</p>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Assignment management is under development. Once the backend is ready, you'll be able to create, assign, and review submissions here.
          </p>
        </div>

      </div>
    </div>
  )
}