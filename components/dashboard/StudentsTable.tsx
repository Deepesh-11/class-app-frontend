import { recentStudents } from "@/lib/dashboard-data"

export default function StudentsTable() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-medium text-gray-900">Recent students</h2>
        <button className="text-xs text-gray-400 hover:text-gray-700 transition">See all</button>
      </div>
      <div className="divide-y divide-gray-50">
        {recentStudents.map(({ name, course, status, score }) => (
          <div key={name} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 flex-shrink-0">
                {name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                <p className="text-xs text-gray-400 truncate">{course}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
              <span className={`text-xs px-2 py-0.5 rounded-md ${
                status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>{status}</span>
              <span className="text-sm font-medium text-gray-700 w-8 text-right">{score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
