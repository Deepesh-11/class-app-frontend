"use client"

import { useState } from "react"
import { useClassrooms } from "@/lib/hooks/useClassrooms"
import { ClassroomResponse } from "@/lib/types/classroom"
import DataTable from "@/components/dashboard/Table"
import ClassroomDetailView from "./ClassroomDetailView"
import AddModal from "@/components/dashboard/AddModal"
import DetailModal from "@/components/dashboard/DetailModal"

export default function ClassroomsPage() {
  const { classrooms, loading, add, update, remove } = useClassrooms()
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<ClassroomResponse | null>()
  const [detailId, setDetailId] = useState<number | null>()

  if (detailId) {
    return <ClassroomDetailView classroom_id={detailId} onBack={() => setDetailId(null)} />
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-gray-900">Classrooms</h1>
          <p className="text-xs text-gray-400 mt-0.5">{classrooms.length} total</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="h-9 px-3.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-[0.98] transition"
        >
          + Add classroom
        </button>
      </div>

      <DataTable
        data={classrooms}
        loading={loading}
        onSelect={setSelected}
        emptyMessage="No classrooms yet. Add one to get started."
        columns={[
          {
            label: "Classroom",
            render: (c: ClassroomResponse) => (
              <div>
                <p className="font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.section ?? "—"}</p>
              </div>
            ),
          },
          {
            label: "Academic year",
            render: (c) => <span className="text-gray-500">{c.academic_year}</span>,
            className: "hidden sm:table-cell",
          },
          {
            label: "",
            render: (c) => (
              <button
                onClick={(e) => { e.stopPropagation(); setDetailId(c.id) }}
                className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition"
              >
                View
              </button>
            ),
          },
        ]}
      />

      {addOpen && (
        <AddModal
          title="Add classroom"
          fields={[
            { label: "Name", key: "name", placeholder: "e.g. Grade 11", required: true },
            { label: "Section", key: "section", placeholder: "e.g. A" },
            { label: "Academic year", key: "academic_year", placeholder: "e.g. 2024-2025", required: true },
          ]}
          onClose={() => setAddOpen(false)}
          onSuccess={async (data) => {
            await add({
              name: data.name,
              section: data.section || undefined,
              academic_year: data.academic_year,
            })
            setAddOpen(false)
          }}
        />
      )}

      {selected && (
        <DetailModal
          title={selected.name}
          subtitle={selected.academic_year}
          fields={[
            { label: "Name", key: "name", placeholder: "e.g. Grade 11" },
            { label: "Section", key: "section", placeholder: "e.g. A" },
            { label: "Academic year", key: "academic_year", placeholder: "e.g. 2024-2025" },
          ]}
          initialValues={{
            name: selected.name,
            section: selected.section ?? "",
            academic_year: selected.academic_year,
          }}
          onClose={() => setSelected(null)}
          onUpdate={async (data) => {
            await update(selected.id, {
              name: data.name as string,
              section: data.section as string,
              academic_year: data.academic_year as string,
            })
            setSelected(null)
          }}
          onDelete={async () => {
            await remove(selected.id)
            setSelected(null)
          }}
        />
      )}
    </div>
  )
}