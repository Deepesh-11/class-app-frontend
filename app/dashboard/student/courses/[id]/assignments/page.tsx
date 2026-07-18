"use client"

import { useAssignments, useMySubmission } from "@/lib/hooks/useAssignments"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function StudentAssignmentsPage() {
  const { id } = useParams()
  const courseId = id as string

  const { assignments, loading, error } = useAssignments(courseId)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Assignments</h1>
          <p className="text-sm text-gray-500 mt-1">View and submit assignments for this course.</p>
        </div>

        {loading && <p className="text-sm text-gray-500">Loading assignments...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && assignments.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm font-medium text-gray-900 mb-1">No assignments yet</p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">Your teacher hasn't posted any assignments for this course yet.</p>
          </div>
        )}

        <div className="space-y-4">
          {assignments.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AssignmentCard({
  assignment,
}: {
  assignment: { id: number; title: string; description: string | null; due_date: string | null }
}) {
  const { submission, loading, submitting, submit } = useMySubmission(assignment.id)
  const [content, setContent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [showForm, setShowForm] = useState(false)

  const isPastDue = assignment.due_date ? new Date(assignment.due_date) < new Date() : false

  async function handleSubmit() {
    if (!content.trim() && !file) {
      toast.error("Add some text or a file before submitting")
      return
    }
    try {
      await submit({ content: content.trim() || undefined, file })
      toast.success(submission ? "Resubmitted successfully" : "Submitted successfully")
      setShowForm(false)
      setContent("")
      setFile(null)
    } catch (err: any) {
      toast.error(err.message ?? "Failed to submit")
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
            {assignment.description && <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>}
            <p className="text-xs text-gray-400 mt-2">
              {assignment.due_date ? `Due ${new Date(assignment.due_date).toLocaleDateString()}` : "No due date"}
              {isPastDue && <span className="text-red-500 ml-2">Past due</span>}
            </p>
          </div>

          {!loading && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
              submission
                ? submission.is_graded
                  ? "bg-green-50 text-green-700"
                  : "bg-blue-50 text-blue-700"
                : "bg-yellow-50 text-yellow-700"
            }`}>
              {submission ? (submission.is_graded ? "Graded" : "Submitted") : "Pending"}
            </span>
          )}
        </div>

        {submission && (
          <div className="mt-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
            <p className="text-xs text-gray-500">Your submission</p>
            {submission.content && <p className="text-sm text-gray-700 mt-1">{submission.content}</p>}
            {submission.file_url && (
              <a href={submission.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-block">{submission.file_name ?? "View your file"}</a>
            )}
            <p className="text-xs text-gray-400 mt-2">Submitted {new Date(submission.submitted_at).toLocaleString()}</p>

            {submission.is_graded && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Grade: <span className="font-medium text-gray-900">{submission.grade ?? "—"}</span></p>
                {submission.feedback && <p className="text-sm text-gray-700 mt-1">{submission.feedback}</p>}
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
              {submission ? "Resubmit" : "Submit assignment"}
            </button>
          ) : (
            <div className="space-y-3">
              <textarea placeholder="Write something (optional)" value={content} onChange={(e) => setContent(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900" />              <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm text-gray-600" />
              <div className="flex gap-2">
                <button onClick={handleSubmit} disabled={submitting} className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50">
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <button onClick={() => setShowForm(false)} className="h-9 px-4 text-sm font-medium text-gray-600 hover:text-gray-900">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
