"use client"

import Link from "next/link"
import { useStudentSelf } from "@/lib/hooks/useStudentSelf"
import { useProfile } from "@/context/ProfileContext"

export default function StudentHomePage() {
  const { classroom, courses, attendance, loading, error } = useStudentSelf()
  const { profile } = useProfile()

  const totalAttended = attendance.reduce(
    (sum, subject) => sum + subject.attended,
    0
  );

  const totalSessions = attendance.reduce(
    (sum, subject) => sum + subject.total_sessions,
    0
  );

  const overallAttendance =
    totalSessions > 0
      ? Math.round((totalAttended / totalSessions) * 100)
      : null;

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
          <div className="grid grid-cols-2 gap-3 mb-8">
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
          <p className="text-sm text-gray-500 mb-1">Student Portal</p>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Welcome back {profile?.name}👋</h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Classroom</p>
            <p className="text-xl font-medium text-gray-900">{classroom ? classroom.name : "—"}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Total Courses</p>
            <p className="text-xl font-medium text-gray-900">
              {courses.length > 0 ? `${courses.length} courses` : "—"}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Overall Attendance</p>
            <p className="text-xl font-medium text-gray-900">
              {overallAttendance !== null ? `${overallAttendance}%` : "—"}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-gray-900">My Courses</h2>

          </div>
          {courses.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-sm text-gray-400">No courses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {courses.map((course: any) => (
                <Link key={course.id} href={`/dashboard/student/courses/${course.id}`} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition cursor-pointer">
                  <p className="text-sm font-medium text-gray-900 mb-1">{course.course_name}</p>
                  <p className="text-xs text-gray-500">{course.teacher_name}</p>
                  {/* <p className="text-xs text-gray-400 mt-3">{course.total_sessions} sessions total</p> */}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-gray-900">Attendance Summary</h2>
            <Link href="/dashboard/student/attendance" className="text-xs text-gray-500 hover:text-gray-900 transition">
              View all →
            </Link>
          </div>
          {attendance.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-sm text-gray-400">No attendance records found.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Course</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Present</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Total</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                      <td className="px-5 py-4 font-medium text-gray-900">{row.course_name}</td>
                      <td className="px-5 py-4 text-gray-600">{row.attended}</td>
                      <td className="px-5 py-4 text-gray-600">{row.total_sessions}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${row.attendance_percentage >= 90 ? "bg-green-50 text-green-700"
                            : row.attendance_percentage >= 75 ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                          {row.attendance_percentage}%
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
    </div>
  )
}