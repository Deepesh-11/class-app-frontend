"use client"

type Props = {
  setSidebarOpen: (open: boolean) => void
}

export default function Topbar({ setSidebarOpen }: Props) {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-gray-500 hover:text-gray-800"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-base font-medium text-gray-900">Overview</h1>
          <p className="text-xs text-gray-400 hidden sm:block">Spring Term 2025 — Week 14</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="h-9 px-3.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition hidden sm:flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Export
        </button>
        <button className="h-9 px-3.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-[0.98] transition">
          + Add student
        </button>
      </div>
    </header>
  )
}
