"use client"

import { nav } from "@/lib/dashboard-data"
import { logout } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { useProfile } from "@/context/ProfileContext"

type Props = {
  active: string
  setActive: (label: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {d
        .split("M")
        .filter(Boolean)
        .map((seg, i) => (
          <path
            key={i}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={"M" + seg}
          />
        ))}
    </svg>
  )
}

export default function Sidebar({
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}: Props) {
  const router = useRouter()
  const { profile } = useProfile()

  const navigation = profile?.role ? nav[profile.role] : []

  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-100 transition-all duration-300",
        collapsed ? "w-20" : "w-56",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:relative lg:translate-x-0 lg:flex",
      ].join(" ")}
    >
      {/* Header */}
      <div
        className={[
          "border-b border-gray-100 py-5 transition-all",
          collapsed
            ? "flex flex-col items-center gap-4 px-2"
            : "flex items-center justify-between px-4",
        ].join(" ")}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.477 10-9 10S3 18.523 3 13c0-.538.046-1.064.134-1.578L12 14z"
              />
            </svg>
          </div>

          {!collapsed && (
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
              ClassPlus
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
        >
          <svg
            className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navigation.map(({ icon, label, href }) => (
          <button
            key={label}
            onClick={() => {
              setActive(label)
              setSidebarOpen(false)
              router.push(href)
            }}
            className={[
              "w-full flex items-center rounded-lg py-2 text-sm transition-colors",
              collapsed ? "justify-center px-2" : "gap-3 px-3",
              active === label
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800",
            ].join(" ")}
          >
            <NavIcon d={icon} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 px-3 py-4 space-y-3">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "gap-2.5"
            }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
            {profile?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {profile?.name}
              </p>
              <p className="truncate text-xs text-gray-400">
                {profile?.role}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className={[
            "w-full flex items-center rounded-lg py-2 text-sm transition-colors",
            collapsed ? "justify-center px-2" : "gap-3 px-3",
            "text-gray-500 hover:bg-gray-50 hover:text-gray-800",
          ].join(" ")}
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}