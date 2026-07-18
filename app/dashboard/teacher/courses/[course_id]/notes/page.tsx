"use client"

import { getNoteDownloadUrl } from "@/lib/api/note"
import { useNotes } from "@/lib/hooks/useNotes"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"

export default function TeacherNotesPage() {
  const { course_id } = useParams()
  const courseId = course_id as string

  const { notes, loading, error, upload, remove } = useNotes(courseId)

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function resetForm() {
    setTitle("")
    setFile(null)
    setShowForm(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleUpload() {
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!file) {
      toast.error("Please choose a file")
      return
    }
    setSaving(true)
    try {
      await upload({ title: title.trim(), file })
      toast.success("Note uploaded")
      resetForm()
    } catch (err: any) {
      toast.error(err.message ?? "Failed to upload note")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this note? This cannot be undone.")) return
    try {
      await remove(id)
      toast.success("Note deleted")
    } catch (err: any) {
      toast.error(err.message ?? "Failed to delete")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Notes</h1>
              <p className="text-sm text-gray-500 mt-1">Manage notes for this course.</p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
            >
              + Add a new Note
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-4">New note</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  File (.pdf, .doc, .docx, .ppt, .pptx, .png, .jpg, .jpeg)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-gray-600 file:mr-3 file:h-9 file:px-4 file:border-0 file:rounded-lg file:bg-gray-100 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleUpload}
                  disabled={saving}
                  className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving ? "Uploading..." : "Upload"}
                </button>
                <button
                  onClick={resetForm}
                  className="h-9 px-4 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="text-sm text-gray-500">Loading notes...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && notes.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm font-medium text-gray-900 mb-1">No notes yet</p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Upload your first note for this course using the button above.
            </p>
          </div>
        )}

        {!loading && !error && notes.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                  <th className="px-5 py-3 font-medium">File</th>
                  <th className="px-5 py-3 font-medium">Uploaded</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((n) => (
                  <tr key={n.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3">
                      
                      <a href={getNoteDownloadUrl(n.id)} className="text-gray-900 hover:underline">{n.title}</a>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {new Date(n.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}