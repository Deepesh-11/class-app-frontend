"use client"

import { useState } from "react"
import { useCourses } from "@/lib/hooks/useCourses"
import DataTable from "@/components/dashboard/Table"
import { CourseCreateResponse, CourseDetailResponse, CourseCreate } from "@/lib/types/course"
import AddModal from "@/components/dashboard/AddModal"
import DetailModal from "@/components/dashboard/DetailModal"

export default function CoursesPage() {
    const { courses, loading, refresh, add, update, remove } = useCourses()
    const [addOpen, setAddOpen] = useState(false)
    const [selected, setSelected] = useState<CourseCreateResponse>()

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-base font-medium text-gray-900">Courses</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{courses.length} total</p>
                </div>
                <button
                    onClick={() => setAddOpen(true)}
                    className="h-9 px-3.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-[0.98] transition"
                >
                    + Add course
                </button>
            </div>
            <DataTable
                data={courses}
                loading={loading}
                onSelect={setSelected}
                emptyMessage="No teachers yet. Add one to get started."
                columns={[
                    {
                        label: "Courses",
                        render: (c: CourseCreateResponse) => (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                    {c.course_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{c.course_name}</p>
                                    <p className="text-xs text-gray-400">{c.course_code ?? "—"}</p>
                                </div>
                            </div>
                        ),
                    },
                    { label: "ID", render: (c) => <span className="text-gray-500 font-mono text-xs">{c.id}</span> },
                    { label: "Course Name", render: (c) => <span className="text-gray-500">{c.course_name ?? "—"}</span>, className: "hidden sm:table-cell" },
                    { label: "Course Code", render: (c) => <span className="text-gray-500">{c.course_code ?? "—"}</span>, className: "hidden md:table-cell" },
                ]}
            />


            {addOpen && (
                <AddModal
                    title="Add Course"
                    fields={[
                        { label: "Course Name", key: "course_name", placeholder: "Data Structures and Algorithm", required: true },
                        { label: "Course Code", key: "course_code", placeholder: "CMP-114" },
                    ]}
                    onClose={() => setAddOpen(false)}
                    onSuccess={async (data) => { await add(data as CourseCreate); await refresh(); setAddOpen(false) }}
                />
            )}

            {selected && (
                <DetailModal
                    title={selected.course_name}
                    subtitle={selected.course_code}
                    fields={[
                        { label: "Course Name", key: "course_name", placeholder: "DSA" },
                        { label: "Course Code", key: "course_code", placeholder: "CMP-114" },
                    ]}
                    initialValues={{
                        course_name: selected.course_name,
                        course_code: selected.course_code
                    }}
                    onClose={() => setSelected(undefined)}
                    onUpdate={async (data) => { await update(selected.id, data as any); await refresh(); setSelected(undefined) }}
                    onDelete={async () => { await remove(selected.id); await refresh(); setSelected(undefined) }}
                />
            )}
        </div>
    )
}