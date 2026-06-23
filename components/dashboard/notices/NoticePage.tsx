"use client"

import { useState } from "react"
import { useNotices } from "@/lib/hooks/useNotices"
import { TargetRole } from "@/lib/types/notice"

type Filter = "all" | "active" | "inactive"

const roleLabels: Record<TargetRole, string> = {
  all: "Everyone",
  student: "Students",
  teacher: "Teachers",
}

const roleBadge: Record<TargetRole, string> = {
  all: "bg-gray-100 text-gray-600",
  student: "bg-blue-50 text-blue-600",
  teacher: "bg-amber-50 text-amber-700",
}

export default function NoticePage() {
  const { notices, loading, add, deactivate, remove } = useNotices()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<Filter>("all")
  const [form, setForm] = useState({ title: "", body: "", target_role: "all" as TargetRole })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const filtered = notices.filter(n => {
    if (filter === "active") return n.is_active
    if (filter === "inactive") return !n.is_active
    return true
  })

  async function handleSubmit() {
    if (!form.title.trim() || !form.body.trim()) { setError("Title and body are required."); return }
    setSubmitting(true)
    setError("")
    try {
      await add(form)
      setOpen(false)
      setForm({ title: "", body: "", target_role: "all" })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-gray-900">Notices</h1>
          <p className="text-xs text-gray-400 mt-0.5">{notices.filter(n => n.is_active).length} active</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="h-9 px-3.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-[0.98] transition"
        >
          + Broadcast
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(["all", "active", "inactive"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-md transition capitalize ${
              filter === f ? "bg-white text-gray-900 shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-gray-400">
          No notices found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`bg-white border rounded-xl px-5 py-4 ${n.is_active ? "border-gray-100" : "border-gray-100 opacity-60"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">{n.title}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${roleBadge[n.target_role]}`}>
                      {roleLabels[n.target_role]}
                    </span>
                    {!n.is_active && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{n.body}</p>
                  <p className="text-xs text-gray-300 mt-2">
                    {new Date(n.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {n.is_active && (
                    <button
                      onClick={() => deactivate(n.id)}
                      className="text-xs text-gray-400 hover:text-gray-700 transition"
                    >
                      Deactivate
                    </button>
                  )}
                  <button
                    onClick={() => remove(n.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-medium text-gray-900">Broadcast notice</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. School closed tomorrow"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message <span className="text-red-400">*</span></label>
                <textarea
                  placeholder="Write your notice here..."
                  value={form.body}
                  onChange={e => setForm({ ...form, body: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Send to</label>
                <div className="flex gap-2">
                  {(["all", "student", "teacher"] as TargetRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => setForm({ ...form, target_role: role })}
                      className={`flex-1 h-9 text-xs rounded-lg border transition ${
                        form.target_role === role
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {roleLabels[role]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 h-9 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 h-9 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition"
              >
                {submitting ? "Sending..." : "Broadcast"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}