"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTeacherSelf } from "@/lib/hooks/useTeacherSelf"
import { formatDate } from "@/lib/utils/utils"

export default function TeacherAttendancePage() {
  const { sessions, loading, error, end, refresh } = useTeacherSelf()
  const [activeSession, setActiveSession] = useState<any>(null)
  const [elapsed, setElapsed] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [newSession, setNewSession] = useState({
    topic: "",
    course_id: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const running = sessions.find((s: any) => s.is_active)
    if (running) {
      setActiveSession(running)
      const start = new Date(running.started_at).getTime()
      setElapsed(Math.floor((Date.now() - start) / 1000))
    } else {
      setActiveSession(null)
    }
  }, [sessions])

  useEffect(() => {
    if (activeSession?.started_at) {
      timerRef.current = setInterval(() => {
        const start = new Date(activeSession.started_at).getTime()
        setElapsed(Math.floor((Date.now() - start) / 1000))
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeSession])

  const formatElapsed = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0) return `${h}h ${m}m ${s}s`
    if (m > 0) return `${m}m ${s}s`
    return `${s}s`
  }

  const handleEndSession = async () => {
    if (!activeSession) return
    try {
      await end(activeSession.id)
      setActiveSession(null)
      setElapsed(0)
    } catch (e) {
      console.error("Failed to end session:", e)
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">


        {/* Active session banner */}
        {activeSession && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-green-800">Session in progress</p>
                </div>
                <p className="text-base font-medium text-green-900">{activeSession.title}</p>
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

       
        {/* Sessions table */}
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
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Title</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Attendance</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session: any) => (
                    <tr key={session.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                      <td className="px-5 py-4 text-gray-600">{formatDate(session.created_at)}</td>
                      <td className="px-5 py-4 font-medium text-gray-900">{session.title}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {session.ended_at ? `${session.total_present}/${session.total_students}` : "—"}
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