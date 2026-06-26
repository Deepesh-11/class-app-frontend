"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

import { getClassroomStudents } from "@/lib/api/teacher-self"
import { ClassroomDetail, StudentInClassroom } from "@/lib/types/classroom"

export default function TeacherClassroomDetailPage() {
  const { classroom_id } = useParams()

  const [classroomStudents, setClassroomStudents] =
    useState<StudentInClassroom[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClassroomStudents(
          Number(classroom_id)
        )

        setClassroomStudents(data)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [classroom_id])

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">


        {/* Header */}
        {/* <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4 mb-6">
          <p className="text-xs uppercase text-gray-500">
            Classroom
          </p>

          <h1 className="text-2xl font-semibold text-gray-900 mt-1">
            {classroom?.name}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Section {classroom.section} • {classroom.academic_year}
          </p>
        </div> */}

        {/* Stats */}
        {/* <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Students
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {classroom?.student_count}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Courses
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {classroom?.courses?.length ?? 0}
            </p>
          </div>
        </div> */}

        {/* Courses */}
        {/* <div className="bg-white border border-gray-200 rounded-xl mb-6">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-medium text-gray-900">
              Courses
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {classroom?.courses?.map(course => (
              <Link
                key={course.id}
                href={`/dashboard/teacher/courses/${course.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {course.course_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {course.course_code}
                  </p>
                </div>

                <span className="text-sm text-gray-400">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div> */}

        {/* Students */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-medium text-gray-900">
              Students
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-700">
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3">Student ID</th>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Roll No.</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {classroomStudents?.map(student => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4 text-gray-600">
                    {student.student_id}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-600">
                    {student.name}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-600">
                    {student.roll_no ? student.roll_no : "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {student.email}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        student.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {student.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}