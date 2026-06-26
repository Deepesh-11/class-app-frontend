"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import { ProfileProvider } from "@/context/ProfileContext"
import { Menu, X } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("Overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const Icon = sidebarOpen ? X : Menu;

  return (



    <ProfileProvider>

      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={[
            "fixed top-4 z-[60] rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 lg:hidden",
            sidebarOpen ? "left-64" : "left-4",
          ].join(" ")}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700" />
          )}
        </button>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar
          active={active}
          setActive={setActive}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            <div className="lg:hidden h-10" />

            {children}
          </main>
        </div>
      </div>
    </ProfileProvider>
  )
}
