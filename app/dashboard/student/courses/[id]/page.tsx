"use client"

import { getNoteDownloadUrl } from "@/lib/api/note"
import { useAssignments } from "@/lib/hooks/useAssignments"
import { useCourseDetail } from "@/lib/hooks/useCoursesDetail"
import { useNotes } from "@/lib/hooks/useNotes"
import Link from "next/link"
import { useParams } from "next/navigation"


export default function CourseDetailPage() {
    const params = useParams()

    const {
        course,
        loading,
        error,
    } = useCourseDetail(params.id as string)

    const { notes, loading: notesLoading } = useNotes(params.id as string)
    const { assignments, loading: assignmentsLoading } = useAssignments(params.id as string)


    if (loading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Loading course...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Course not found.</p>
            </div>
        )
    }

    const missedSessions =
        course.total_sessions - course.attended_sessions

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">
                            {course.course_code}
                        </p>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            {course.course_name}
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Teacher: {course.teacher_name ?? "Not Assigned"}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-500">
                            Attendance
                        </p>

                        <p className="text-3xl font-bold text-gray-900">
                            {course.attendance_percentage}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs text-gray-500">
                        Total Sessions
                    </p>

                    <p className="text-2xl font-semibold text-gray-900 mt-2">
                        {course.total_sessions}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs text-gray-500">
                        Attended
                    </p>

                    <p className="text-2xl font-semibold text-green-600 mt-2">
                        {course.attended_sessions}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs text-gray-500">
                        Missed
                    </p>

                    <p className="text-2xl font-semibold text-red-600 mt-2">
                        {missedSessions}
                    </p>
                </div>
            </div>

            {/* Progress */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium text-gray-900">
                        Attendance Progress
                    </h2>

                    <span className="text-sm text-gray-500">
                        {course.attendance_percentage}%
                    </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                        className="h-3 rounded-full bg-gray-900"
                        style={{
                            width: `${course.attendance_percentage}%`,
                        }}
                    />
                </div>
            </div>

            {/* Course Resources */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Notes */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-medium text-gray-900">
                            Notes & Materials
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-100">
    {notesLoading ? (
        <p className="text-sm text-gray-500 p-4">Loading notes...</p>
    ) : notes.length === 0 ? (
        <p className="text-sm text-gray-400 p-4">No notes yet.</p>
    ) : (
        notes.map((note) => (
            <div
                key={note.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {note.title}
                    </p>

                    <p className="text-xs text-gray-500">
                        Uploaded {new Date(note.created_at).toLocaleDateString()}
                    </p>
                </div>

                <a href={getNoteDownloadUrl(note.id)} className="text-sm text-gray-600 hover:text-gray-900">Download</a>
                
            </div>
        ))
    )}
</div>
                </div>

                {/* Assignments */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-medium text-gray-900">
                            Assignments
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-100">
    {assignmentsLoading ? (
        <p className="text-sm text-gray-500 p-4">Loading assignments...</p>
    ) : assignments.length === 0 ? (
        <p className="text-sm text-gray-400 p-4">No assignments yet.</p>
    ) : (
        assignments.map((assignment) => (
            <Link key={assignment.id} href={`/dashboard/student/courses/${params.id}/assignments`} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {assignment.title}
                    </p>

                    <p className="text-xs text-gray-500">
                        Due: {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : "No due date"}
                    </p>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    View
                </span>
            </Link>
        ))
    )}
</div>
                </div>
            </div>

            {/* Session History */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-medium text-gray-900">
                        Session History
                    </h2>
                </div>

                {course.sessions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No sessions found.
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-6 py-3 text-gray-500">
                                    Session
                                </th>

                                <th className="text-left px-6 py-3 text-gray-500">
                                    Date
                                </th>

                                <th className="text-left px-6 py-3 text-gray-500">
                                    Attendance
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {course.sessions.map((session) => (
                                <tr
                                    key={session.session_id}
                                    className="border-b border-gray-100 last:border-0"
                                >
                                    <td className="px-6 py-4 text-gray-600">
                                        {session.title ?? "Untitled Session"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {session.started_at
                                            ? new Date(
                                                session.started_at
                                            ).toLocaleString()
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${session.attended
                                                ? "bg-green-50 text-green-700"
                                                : "bg-red-50 text-red-700"
                                                }`}
                                        >
                                            {session.attended
                                                ? "Present"
                                                : "Absent"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}