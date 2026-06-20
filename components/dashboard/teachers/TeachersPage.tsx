"use client"

import { useState } from "react"
import { useTeachers } from "@/lib/hooks/useTeachers"
import DataTable from "@/components/dashboard/Table"
import AddModal from "@/components/dashboard/AddModal"
import DetailModal from "@/components/dashboard/DetailModal"
import { TeacherResponse } from "@/lib/types/teacher"
import { TeacherCreate } from "@/lib/types/teacher"
import Button from "@/components/Button"

export default function StudentsPage() {
  const { teachers, loading, refresh, add, update, remove } = useTeachers()
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<TeacherResponse>()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-gray-900">Teachers</h1>
          <p className="text-xs text-gray-400 mt-0.5">{teachers.length} total</p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
        >
          + Add Teacher
        </Button>
      </div>

      <DataTable
        data={teachers}
        loading={loading}
        onSelect={setSelected}
        emptyMessage="No teachers yet. Add one to get started."
        columns={[
          {
            label: "Teacher",
            render: (t: TeacherResponse) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  {t.user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{t.user.name}</p>
                  <p className="text-xs text-gray-400">{t.user.email ?? "—"}</p>
                </div>
              </div>
            ),
          },
          { label: "ID", render: (t) => <span className="text-gray-500 font-mono text-xs">{t.teacher_id}</span> },
          { label: "Roll No.", render: (t) => <span className="text-gray-500">{t.department ?? "—"}</span>, className: "hidden sm:table-cell" },
          { label: "Phone", render: (t) => <span className="text-gray-500">{t.phone ?? "—"}</span>, className: "hidden md:table-cell" },
          {
            label: "Status",
            render: (t) => (
              <span className={`text-xs px-2 py-0.5 rounded-md ${t.user.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {t.user.is_active ? "Active" : "Inactive"}
              </span>
            ),
          },
        ]}
      />

      {addOpen && (
        <AddModal
          title="Add teacher"
          fields={[
            { label: "Name", key: "name", placeholder: "Full name", required: true },
            { label: "Email", key: "email", placeholder: "you@example.com" },
            { label: "Department", key: "department", placeholder: "e.g. Mathematics" },
            { label: "Phone", key: "phone", placeholder: "+1 234 567 8900" },
          ]}
          onClose={() => setAddOpen(false)}
          onSuccess={async (data) => { await add(data as TeacherCreate); await refresh(); setAddOpen(false) }}
        />
      )}

      {selected && (
        <DetailModal
          title={selected.user.name}
          subtitle={selected.teacher_id}
          fields={[
            { label: "Name", key: "name", placeholder: "Full name" },
            { label: "Email", key: "email", placeholder: "you@example.com" },
            { label: "Department", key: "department", placeholder: "Computer" },
            { label: "Phone", key: "phone", placeholder: "+1 234 567 8900" },
          ]}
          initialValues={{
            name: selected.user.name,
            email: selected.user.email ?? "",
            department: selected.department ?? "",
            phone: selected.phone ?? "",
          }}
          isActive={selected.user.is_active}
          onClose={() => setSelected(undefined)}
          onUpdate={async (data) => { await update(selected.teacher_id, data as any); await refresh(); setSelected(undefined) }}
          onDelete={async () => { await remove(selected.teacher_id); await refresh(); setSelected(undefined) }}
        />
      )}

    </div>
  )
}
