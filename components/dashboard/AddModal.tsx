"use client"

import { useState } from "react"

type Field = {
  label: string
  key: string
  placeholder: string
  required?: boolean
}

type Props<T extends Record<string, string>> = {
  title: string
  fields: Field[]
  onClose: () => void
  onSuccess: (data: Record<string, string | undefined>) => Promise<void>
}

export default function AddModal<T extends Record<string, string>>({
  title,
  fields,
  onClose,
  onSuccess,
}: Props<T>) {
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, ""]))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit() {
    const requiredField = fields.find((f) => f.required && !form[f.key]?.trim())
    if (requiredField) { setError(`${requiredField.label} is required.`); return }
    setLoading(true)
    setError("")
    try {
      const data = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v || undefined])
      ) as Partial<T>
      await onSuccess(data)
    } catch (e: any) {
      setError(e.message ?? "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {fields.map(({ label, key, placeholder, required }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-400">*</span>}
              </label>
              <input
                type="text"
                placeholder={placeholder}
                value={form[key]}
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
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  )
}