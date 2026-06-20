import { StudentResponse } from "@/lib/types/student"

type Props = {
  students: StudentResponse[]
  loading: boolean
  onSelect: (s: StudentResponse) => void
  onRefresh: () => void
}

export default function StudentsTable({ students, loading, onSelect }: Props) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
        Loading...
      </div>
    )
  }

  if (!students.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
        No students yet. Add one to get started.
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Student</th>
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">ID</th>
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 hidden sm:table-cell">Roll no.</th>
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 hidden md:table-cell">Phone</th>
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {students.map((s) => (
            <tr
              key={s.id}
              onClick={() => onSelect(s)}
              className="hover:bg-gray-50 cursor-pointer transition"
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 flex-shrink-0">
                    {s.user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">{s.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{s.user.email ?? "—"}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-gray-500 font-mono text-xs">{s.student_id}</td>
              <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{s.roll_no ?? "—"}</td>
              <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{s.phone ?? "—"}</td>
              <td className="px-5 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-md ${
                  s.user.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {s.user.is_active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
