import { upcoming } from "@/lib/dashboard-data"

export default function UpcomingPanel() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-medium text-gray-900">Upcoming</h2>
        <button className="text-xs text-gray-400 hover:text-gray-700 transition">Calendar</button>
      </div>
      <div className="divide-y divide-gray-50">
        {upcoming.map(({ title, date, time, tag }) => (
          <div key={title} className="px-5 py-3 hover:bg-gray-50 transition">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-gray-800 leading-snug">{title}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                tag === "Exam" ? "bg-red-50 text-red-600" :
                tag === "Quiz" ? "bg-amber-50 text-amber-700" :
                tag === "Meeting" ? "bg-blue-50 text-blue-700" :
                "bg-gray-100 text-gray-500"
              }`}>{tag}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{date} · {time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
