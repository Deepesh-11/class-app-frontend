"use client"

import { useState } from "react"

type Props = {
  onClose: () => void
  onSuccess: () => void
}

export default function AddStudentModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ name: "", email: "", roll_no: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit() {
    if (!form.name.trim()) { setError("Name is required."); return }
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: form.name,
        email: form.email || undefined,
        roll_no: form.roll_no || undefined,
        phone: form.phone || undefined,
      }),
    })
    setLoading(false)
    if (!res.ok) {
      const err = await res.json()
      setError(err.detail ?? "Something went wrong.")
      return
    }
    const data = await res.json()
    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-gray-900">Add student</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {[
            { label: "Name", key: "name", placeholder: "Full name", required: true },
            { label: "Email", key: "email", placeholder: "you@example.com" },
            { label: "Roll no.", key: "roll_no", placeholder: "e.g. 2024-001" },
            { label: "Phone", key: "phone", placeholder: "+1 234 567 8900" },
          ].map(({ label, key, placeholder, required }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-400">*</span>}
              </label>
              <input
                type="text"
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
              />
            </div>
          ))}
        </div>

        {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

        <div className="flex items-center gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 h-9 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-9 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition"
          >
            {loading ? "Adding..." : "Add student"}
          </button>
        </div>
      </div>
    </div>
  )
}
