"use client"

import { useState } from "react"

type Field = {
  label: string
  key: string
  placeholder: string
}

type Props<T> = {
  title: string
  subtitle: string
  fields: Field[]
  initialValues: Record<string, string>
  isActive: boolean
  onClose: () => void
  onUpdate: (data: Record<string, string | boolean | undefined>) => Promise<void>
  onDelete: () => Promise<void>
}

export default function DetailModal<T>({
  title,
  subtitle,
  fields,
  initialValues,
  isActive: initialActive,
  onClose,
  onUpdate,
  onDelete,
}: Props<T>) {
  const [form, setForm] = useState<Record<string, string>>(initialValues)
  const [isActive, setIsActive] = useState(initialActive)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function handleUpdate() {
    setLoading(true)
    setError("")
    try {
      const data = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v || undefined])
      )
      await onUpdate({ ...data, is_active: isActive })
    } catch {
      setError("Failed to update.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await onDelete()
    } catch {
      setError("Failed to delete.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
              {title.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="text-xs text-gray-400 font-mono">{subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {fields.map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={form[key] ?? ""}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
              />
            </div>
          ))}

          <div className="flex items-center justify-between py-1">
            <label className="text-xs font-medium text-gray-700">Active</label>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative w-9 h-5 rounded-full transition-colors ${isActive ? "bg-gray-900" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

        <div className="flex items-center gap-2 mt-5">
          {!confirmDelete ? (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                className="h-9 px-3.5 text-sm text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 h-9 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 h-9 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 h-9 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
              >
                {deleting ? "Deleting..." : "Confirm delete"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}