"use client"

import { useAssignments, useSubmissions } from "@/lib/hooks/useAssignments"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function TeacherAssignmentsPage() {
  const { course_id } = useParams()
  const courseId = course_id as string

  const { assignments, loading, error, create, update, remove } = useAssignments(courseId)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [saving, setSaving] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  function resetForm() {
    setTitle("")
    setDescription("")
    setDueDate("")
    setEditingId(null)
    setShowForm(false)
  }

  function startEdit(a: { id: number; title: string; description: string | null; due_date: string | null }) {
    setEditingId(a.id)
    setTitle(a.title)
    setDescription(a.description ?? "")
    setDueDate(a.due_date ? a.due_date.slice(0, 10) : "")
    setShowForm(true)
  }

  async function handleSave() {
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    setSaving(true)
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        due_date: dueDate || undefined,
      }
      if (editingId) {
        await update(editingId, payload)
        toast.success("Assignment updated")
      } else {
        await create(payload)
        toast.success("Assignment created")
      }
      resetForm()
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this assignment? This cannot be undone.")) return
    try {
      await remove(id)
      toast.success("Assignment deleted")
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
              <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Assignments</h1>
              <p className="text-sm text-gray-500 mt-1">Manage assignments for this course.</p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
            >
              + New assignment
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-4">
              {editingId ? "Edit assignment" : "New assignment"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <div>
                <label className="block text-xs text-gray-500 mb-1">Due date (optional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Save changes" : "Create"}
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

        {loading && <p className="text-sm text-gray-500">Loading assignments...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && assignments.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm font-medium text-gray-900 mb-1">No assignments yet</p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Create your first assignment for this course using the button above.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.title}</p>
                  {a.description && (
                    <p className="text-sm text-gray-500 mt-1">{a.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {a.due_date ? `Due ${new Date(a.due_date).toLocaleDateString()}` : "No due date"}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {expandedId === a.id ? "Hide submissions" : "View submissions"}
                  </button>
                  <button
                    onClick={() => startEdit(a)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {expandedId === a.id && <SubmissionsPanel assignmentId={a.id} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SubmissionsPanel({ assignmentId }: { assignmentId: number }) {
  const { submissions, loading, error, grade } = useSubmissions(assignmentId)
  const [gradeInputs, setGradeInputs] = useState<Record<number, { grade: string; feedback: string }>>({})

  function getInput(id: number) {
    return gradeInputs[id] ?? { grade: "", feedback: "" }
  }

  async function handleGrade(id: number) {
    const input = getInput(id)
    try {
      await grade(id, { grade: input.grade || undefined, feedback: input.feedback || undefined })
      toast.success("Grade saved")
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save grade")
    }
  }

  return (
    <div className="border-t border-gray-100 bg-gray-50/50 p-5">
      {loading && <p className="text-sm text-gray-500">Loading submissions...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && submissions.length === 0 && (
        <p className="text-sm text-gray-400">No submissions yet.</p>
      )}
      <div className="space-y-3">
        {submissions.map((s) => {
          const input = getInput(s.id)
          return (
            <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {s.student_name ?? `Student #${s.student_id}`}
                  </p>
                  <p className="text-xs text-gray-400">{s.student_email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Submitted {new Date(s.submitted_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    s.is_graded ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {s.is_graded ? "Graded" : "Ungraded"}
                </span>
              </div>

              {s.content && <p className="text-sm text-gray-700 mt-3">{s.content}</p>}
              {s.file_url && (
                <a href={s.file_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:underline mt-2 inline-block">{s.file_name ?? "View submitted file"}
                </a>
              )}

              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Grade"
                  value={input.grade}
                  onChange={(e) =>
                    setGradeInputs((prev) => ({ ...prev, [s.id]: { ...input, grade: e.target.value } }))
                  }
                  className="w-24 h-8 px-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  placeholder="Feedback"
                  value={input.feedback}
                  onChange={(e) =>
                    setGradeInputs((prev) => ({ ...prev, [s.id]: { ...input, feedback: e.target.value } }))
                  }
                  className="flex-1 h-8 px-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  onClick={() => handleGrade(s.id)}
                  className="h-8 px-3 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
