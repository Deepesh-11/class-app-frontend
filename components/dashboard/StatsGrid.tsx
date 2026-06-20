import { stats } from "@/lib/dashboard-data"

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(({ label, value, change, up }) => (
        <div key={label} className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-medium text-gray-900 tracking-tight">{value}</p>
          <p className={`text-xs mt-1 ${up ? "text-green-600" : "text-red-500"}`}>{change}</p>
        </div>
      ))}
    </div>
  )
}
