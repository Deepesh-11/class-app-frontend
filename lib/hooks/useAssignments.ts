import { useState, useEffect, useCallback } from "react"
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
  getMySubmission,
  gradeSubmission,
  deleteSubmission,
} from "@/lib/api/assignment"
import {
  AssignmentResponse,
  SubmissionResponse,
  SubmissionWithStudent,
} from "@/lib/types/assignment"

// ---------- Teacher: list + manage assignments for a course ----------

export function useAssignments(courseId: number | string) {
  const [assignments, setAssignments] = useState<AssignmentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAssignments(courseId)
      setAssignments(data)
    } catch (err: any) {
      setError(err.message ?? "Failed to load assignments")
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const create = useCallback(
    async (data: { title: string; description?: string; due_date?: string }) => {
      const created = await createAssignment(courseId, data)
      setAssignments((prev) => [created, ...prev])
      return created
    },
    [courseId]
  )

  const update = useCallback(
    async (
      assignmentId: number | string,
      data: { title?: string; description?: string; due_date?: string }
    ) => {
      const updated = await updateAssignment(courseId, assignmentId, data)
      setAssignments((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      )
      return updated
    },
    [courseId]
  )

  const remove = useCallback(
    async (assignmentId: number | string) => {
      await deleteAssignment(courseId, assignmentId)
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId))
    },
    [courseId]
  )

  return { assignments, loading, error, refresh, create, update, remove }
}

// ---------- Student: submit + view own submission for one assignment ----------

export function useMySubmission(assignmentId: number | string) {
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMySubmission(assignmentId)
      setSubmission(data)
    } catch (err: any) {
      setError(err.message ?? "Failed to load your submission")
    } finally {
      setLoading(false)
    }
  }, [assignmentId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const submit = useCallback(
    async (data: { content?: string; file?: File | null }) => {
      setSubmitting(true)
      setError(null)
      try {
        const result = await submitAssignment(assignmentId, data)
        setSubmission(result)
        return result
      } catch (err: any) {
        setError(err.message ?? "Failed to submit")
        throw err
      } finally {
        setSubmitting(false)
      }
    },
    [assignmentId]
  )

  return { submission, loading, error, submitting, refresh, submit }
}

// ---------- Teacher: view + grade all submissions for one assignment ----------

export function useSubmissions(assignmentId: number | string) {
  const [submissions, setSubmissions] = useState<SubmissionWithStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getSubmissions(assignmentId)
      setSubmissions(data)
    } catch (err: any) {
      setError(err.message ?? "Failed to load submissions")
    } finally {
      setLoading(false)
    }
  }, [assignmentId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const grade = useCallback(
    async (submissionId: number | string, data: { grade?: string; feedback?: string }) => {
      const updated = await gradeSubmission(submissionId, data)
      setSubmissions((prev) =>
        prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
      )
      return updated
    },
    []
  )

  const remove = useCallback(async (submissionId: number | string) => {
    await deleteSubmission(submissionId)
    setSubmissions((prev) => prev.filter((s) => s.id !== submissionId))
  }, [])

  return { submissions, loading, error, refresh, grade, remove }
}
