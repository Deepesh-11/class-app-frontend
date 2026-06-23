"use client"
import { nav } from "@/lib/dashboard-data"
import { logout } from "@/lib/api/auth"
import { useRouter } from "next/navigation"

type Props = {
  active: string
  setActive: (label: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {d.split("M").filter(Boolean).map((seg, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={"M" + seg} />
      ))}
    </svg>
  )
}

export default function Sidebar({ active, setActive, sidebarOpen, setSidebarOpen }: Props) {
	const router = useRouter()
  return (
    <aside className={[
      "fixed inset-y-0 left-0 z-30 flex flex-col w-56 bg-white border-r border-gray-100 transition-transform duration-200",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
      "lg:relative lg:translate-x-0 lg:flex"
    ].join(" ")}>
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.477 10-9 10S3 18.523 3 13c0-.538.046-1.064.134-1.578L12 14z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-900 tracking-tight">ClassPlus</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ icon, label, href }) => (
          <button
            key={label}
            onClick={() => { setActive(label); setSidebarOpen(false); router.push(href) }}
            className={[
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
              active === label
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            ].join(" ")}
          >
            <NavIcon d={icon} />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
            AK
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Abeeral Maharjan</p>
            <p className="text-xs text-gray-400 truncate">Admin</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  )
}
