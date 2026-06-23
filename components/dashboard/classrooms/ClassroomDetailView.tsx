"use client"

import { useState } from "react"
import { useClassroomDetail } from "@/lib/hooks/useClassroomDetail"
import AddModal from "@/components/dashboard/AddModal"

type Props = {
    classroom_id: number
    onBack: () => void
}

export default function ClassroomDetailView({ classroom_id, onBack }: Props) {
    const { classroom, loading, enroll, kick, assign, unassign } = useClassroomDetail(classroom_id)
    const [enrollOpen, setEnrollOpen] = useState(false)
    const [assignOpen, setAssignOpen] = useState(false)

    if (loading) {
        return <div className="text-sm text-gray-400 p-8 text-center">Loading...</div>
    }

    if (!classroom) return null

    return (
        <div className="space-y-5">

            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-gray-700 transition"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-base font-medium text-gray-900">{classroom.name}</h1>
                    <p className="text-xs text-gray-400">{classroom.section ? `${classroom.section} · ` : ""}{classroom.academic_year}</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-medium text-gray-900">Students <span className="text-gray-400 font-normal">({classroom.students.length})</span></h2>
                    <button
                        onClick={() => setEnrollOpen(true)}
                        className="text-xs text-white bg-gray-900 rounded-lg px-2.5 py-1.5 hover:bg-gray-700 transition"
                    >
                        + Enroll
                    </button>
                </div>
                {classroom.students.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">No students enrolled yet.</p>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {classroom.students.map((s) => (
                            <div key={s.id} className="flex items-center justify-between px-5 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                        {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{s.name}</p>
                                        <p className="text-xs text-gray-400">{s.student_id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => kick(s.student_id)}
                                    className="text-xs text-red-400 hover:text-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-medium text-gray-900">Courses <span className="text-gray-400 font-normal">({classroom.courses.length})</span></h2>
                    <button
                        onClick={() => setAssignOpen(true)}
                        className="text-xs text-white bg-gray-900 rounded-lg px-2.5 py-1.5 hover:bg-gray-700 transition"
                    >
                        + Assign
                    </button>
                </div>
                {classroom.courses.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">No courses assigned yet.</p>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {classroom.courses.map((c) => (
                            <div key={c.id} className="flex items-center justify-between px-5 py-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{c.course_name}</p>
                                    <p className="text-xs text-gray-400">{c.course_code}{c.teacher_name ? ` · ${c.teacher_name}` : " · Unassigned"}</p>
                                </div>
                                <button
                                    onClick={() => unassign(c.id)}
                                    className="text-xs text-red-400 hover:text-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {enrollOpen && (
                <AddModal
                    title="Enroll student"
                    fields={[
                        { label: "Student ID", key: "student_id", placeholder: "e.g. STU001", required: true },
                        { label: "Roll no.", key: "roll_no", placeholder: "e.g. 01" },
                    ]}
                    onClose={() => setEnrollOpen(false)}
                    onSuccess={async (data) => {
                        await enroll({ student_id: data.student_id as string, roll_no: data.roll_no || undefined })
                        setEnrollOpen(false)
                    }}
                />
            )}

            {assignOpen && (
                <AddModal
                    title="Assign course"
                    fields={[
                        { label: "Course ID", key: "course_id", placeholder: "e.g. 3", required: true },
                        { label: "Teacher ID", key: "teacher_id", placeholder: "e.g. 7 (optional)" },
                    ]}
                    onClose={() => setAssignOpen(false)}
                    onSuccess={async (data) => {
                        console.log("assigning", {
                            course_id: Number(data.course_id),
                            teacher_id: data.teacher_id ? Number(data.teacher_id) : undefined,
                        })

                        await assign({
                            course_id: Number(data.course_id),
                            teacher_id: data.teacher_id ? Number(data.teacher_id) : undefined,
                        })
                        setAssignOpen(false)

                    }}
                />
            )}

        </div>
    )
}