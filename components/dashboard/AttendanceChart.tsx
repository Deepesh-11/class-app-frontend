const weeks = [82, 87, 84, 90, 88, 85, 91, 86, 89, 87, 93, 87, 85, 88]

export default function AttendanceChart() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-medium text-gray-900">Attendance this term</h2>
          <p className="text-xs text-gray-400 mt-0.5">Weekly average across all classes</p>
        </div>
        <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-500 outline-none focus:border-gray-400 bg-white">
          <option>Spring 2025</option>
          <option>Fall 2024</option>
        </select>
      </div>
      <div className="flex items-end gap-1.5 h-28">
        {weeks.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition">{v}%</span>
            <div className="w-full rounded-sm bg-gray-900 transition-all" style={{ height: `${(v / 100) * 80}px` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-gray-300">Week 1</span>
        <span className="text-[10px] text-gray-300">Week 14</span>
      </div>
    </div>
  )
}
