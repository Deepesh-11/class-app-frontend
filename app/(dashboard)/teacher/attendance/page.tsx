"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

type Session = {
  id: number
  date: string
  topic: string
  course_id: number
  course_name: string
  is_active: boolean
  started_at: string | null
  ended_at: string | null
  total_present: number
  total_students: number
}

export default function TeacherAttendancePage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSession, setActiveSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [newSession, setNewSession] = useState({
    topic: "",
    course_id: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    fetchSessions()
  }, [])

  // live timer for active session
  useEffect(() => {
    if (activeSession?.started_at) {
      const start = new Date(activeSession.started_at).getTime()
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - start) / 1000))
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeSession])

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/sessions`)
      if (res.ok) {
        const data: Session[] = await res.json()
        setSessions(data)
        const running = data.find((s) => s.is_active)
        if (running) {
          setActiveSession(running)
          const start = new Date(running.started_at!).getTime()
          setElapsed(Math.floor((Date.now() - start) / 1000))
        }
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSession = async () => {
    if (!newSession.topic || !newSession.course_id) return
    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: newSession.topic,
          course_id: Number(newSession.course_id),
          date: newSession.date,
        }),
      })
      if (res.ok) {
        const created = await res.json()
        setSessions((prev) => [created, ...prev])
        setNewSession({
          topic: "",
          course_id: "",
          date: new Date().toISOString().split("T")[0],
        })
      }
    } catch (error) {
      console.error("Failed to create session:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStartSession = async (sessionId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attendance/sessions/${sessionId}/start`,
        { method: "POST" }
      )
      if (res.ok) {
        const updated = await res.json()
        setActiveSession(updated)
        setElapsed(0)
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? updated : s))
        )
      }
    } catch (error) {
      console.error("Failed to start session:", error)
    }
  }

  const handleEndSession = async () => {
    if (!activeSession) return
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attendance/sessions/${activeSession.id}/end`,
        { method: "POST" }
      )
      if (res.ok) {
        const updated = await res.json()
        setActiveSession(null)
        setElapsed(0)
        if (timerRef.current) clearInterval(timerRef.current)
        setSessions((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        )
      }
    } catch (error) {
      console.error("Failed to end session:", error)
    }
  }

  const formatElapsed = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0) return `${h}h ${m}m ${s}s`
    if (m > 0) return `${m}m ${s}s`
    return `${s}s`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-7 w-48 bg-gray-200 rounded mb-8" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 mb-3">
              <div className="h-3 w-32 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link href="/teacher" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Back to home
          </Link>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mt-2">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage class sessions.</p>
        </div>

        {/* Active session banner */}
        {activeSession && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-green-800">Session in progress</p>
                </div>
                <p className="text-base font-medium text-green-900">{activeSession.topic}</p>
                <p className="text-xs text-green-700 mt-0.5">{activeSession.course_name}</p>
                <p className="text-xs text-green-600 mt-2">Duration: {formatElapsed(elapsed)}</p>
              </div>
              <button
                onClick={handleEndSession}
                className="h-9 px-4 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 active:scale-[0.99] transition"
              >
                End session
              </button>
            </div>
          </div>
        )}

        {/* Create session */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Create new session</h2>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Course ID</label>
              <input
                type="number"
                placeholder="e.g. 1"
                value={newSession.course_id}
                onChange={(e) => setNewSession({ ...newSession, course_id: e.target.value })}
                className="w-full h-10 px-3 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Topic</label>
              <input
                type="text"
                placeholder="e.g. Introduction to Algebra"
                value={newSession.topic}
                onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                className="w-full h-10 px-3 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Date</label>
              <input
                type="date"
                value={newSession.date}
                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                className="w-full h-10 px-3 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
              />
            </div>
          </div>
          <button
            onClick={handleCreateSession}
            disabled={submitting || !!activeSession}
            className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.99] transition disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create session"}
          </button>
          {activeSession && (
            <p className="text-xs text-gray-400 mt-2">End the current session before creating a new one.</p>
          )}
        </div>

        {/* Past sessions */}
        <div>
          <h2 className="text-sm font-medium text-gray-900 mb-4">All Sessions</h2>
          {sessions.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <p className="text-sm text-gray-400">No sessions created yet.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Date</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Topic</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Course</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Attendance</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr
                      key={session.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4 text-gray-600">{session.date}</td>
                      <td className="px-5 py-4 font-medium text-gray-900">{session.topic}</td>
                      <td className="px-5 py-4 text-gray-600">{session.course_name}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {session.ended_at
                          ? `${session.total_present}/${session.total_students}`
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        {session.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            Live
                          </span>
                        ) : session.ended_at ? (
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Ended
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                            Not started
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {!session.is_active && !session.ended_at && !activeSession && (
                          <button
                            onClick={() => handleStartSession(session.id)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition"
                          >
                            Start
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}