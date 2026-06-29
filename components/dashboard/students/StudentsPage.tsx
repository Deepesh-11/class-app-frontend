"use client"
import { useState } from "react"
import { useStudents } from "@/lib/hooks/useStudents"
import DataTable from "@/components/dashboard/Table"
import AddModal from "@/components/dashboard/AddModal"
import DetailModal from "@/components/dashboard/DetailModal"
import { StudentResponse } from "@/lib/types/student"
import { StudentCreate } from "@/lib/types/student"

export default function StudentsPage() {
  const { students, loading, refresh, add, update, remove } = useStudents()
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<StudentResponse>()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-gray-900">Students</h1>
          <p className="text-xs text-gray-400 mt-0.5">{students.length} total</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="h-9 px-3.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-[0.98] transition"
        >
          + Add student
        </button>
      </div>
      <DataTable
        data={students}
        loading={loading}
        onSelect={setSelected}
        emptyMessage="No students yet. Add one to get started."
        columns={[
          {
            label: "Student",
            render: (s) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  {s.user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{s.user.name}</p>
                  <p className="text-xs text-gray-400">{s.user.email ?? "—"}</p>
                </div>
              </div>
            ),
          },
          { label: "ID", render: (s) => <span className="text-gray-500 font-mono text-xs">{s.student_id}</span> },
          { label: "Roll No.", render: (s) => <span className="text-gray-500">{s.roll_no ?? "—"}</span>, className: "hidden sm:table-cell" },
          { label: "Phone", render: (s) => <span className="text-gray-500">{s.phone ?? "—"}</span>, className: "hidden md:table-cell" },
          {
            label: "Status",
            render: (s) => (
              <span className={`text-xs px-2 py-0.5 rounded-md ${s.user.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {s.user.is_active ? "Active" : "Inactive"}
              </span>
            ),
          },
        ]}
      />
      {addOpen && (
        <AddModal
          title="Add student"
          fields={[
            { label: "Name", key: "name", placeholder: "Full name", required: true },
            { label: "Email", key: "email", placeholder: "you@example.com", required: true },
            { label: "Roll no.", key: "roll_no", placeholder: "e.g. 2024-001" },
            { label: "Phone", key: "phone", placeholder: "+1 234 567 8900" },
          ]}
          onClose={() => setAddOpen(false)}
          onSuccess={async (data) => { await add(data as StudentCreate); await refresh(); setAddOpen(false) }}
        />
      )}


      {selected && (
        <DetailModal
          title={selected.user.name}
          subtitle={selected.student_id}
          fields={[
            { label: "Name", key: "name", placeholder: "Full name" },
            { label: "Email", key: "email", placeholder: "you@example.com" },
            { label: "Phone", key: "phone", placeholder: "+1 234 567 8900" },
          ]}
          initialValues={{
            name: selected.user.name,
            email: selected.user.email ?? "",
            phone: selected.phone ?? "",
          }}
          isActive={selected.user.is_active}
          onClose={() => setSelected(undefined)}
          onUpdate={async (data) => { await update(selected.student_id, data as StudentCreate); await refresh(); setSelected(undefined) }}
          onDelete={async () => { await remove(selected.student_id); await refresh(); setSelected(undefined) }}
        />
      )}

    </div>
  )
}
