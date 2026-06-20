"use client"

import { useState } from "react"
import { useStudents } from "@/lib/hooks/useStudents"
import StudentsTable from "./StudentsTable"
import AddStudentModal from "./AddStudentModal"
import StudentDetailModal from "./StudentDetailModal"
import { StudentResponse } from "@/lib/types/student"

export default function StudentsPage() {
  const { students, loading, refresh } = useStudents()
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<StudentResponse | null>(null)

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

      <StudentsTable students={students} loading={loading} onSelect={setSelected} />

      {addOpen && (
  	  <AddStudentModal
    	    onClose={() => setAddOpen(false)}
    	    onSuccess={async () => {
      	      await refresh()   // just refetch the list
      	      setAddOpen(false)
    	    }}
  	  />
	)}

	{selected && (
  	  <StudentDetailModal
    	    student={selected}
    	    onClose={() => setSelected(null)}
    	    onSuccess={async () => {
      	      await refresh()
      	      setSelected(null)
    	    }}
  	  />
	)}
      
    </div>
  )
}
