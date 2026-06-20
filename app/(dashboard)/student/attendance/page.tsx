"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

type ActiveSession = {
  id: number
  topic: string
  course_name: string
  started_at: string
}

type AttendanceRecord = {
  course: string
  date: string
  status: "present" | "absent"
}

type AttendanceSummary = {
  course: string
  present: number
  total: number
  percentage: number
}

type JoinState = "idle" | "joined" | "ended"

export default function StudentAttendancePage() {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null)
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [summary, setSummary] = useState<AttendanceSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [joinState, setJoinState] = useState<JoinState>("idle")
  const [elapsed, setElapsed] = useState(0)
  const [confirming, setConfirming] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<"summary" | "records">("summary")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  // live timer after joining
  useEffect(() => {
    if (joinState === "joined") {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [joinState])

  const fetchData = async () => {
    try {
      const [activeRes, recordsRes, summaryRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/sessions/active`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/my-records`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/me/attendance`),
      ])
      if (activeRes.ok) setActiveSession(await activeRes.json())
      if (recordsRes.ok) setRecords(await recordsRes.json())
      if (summaryRes.ok) setSummary(await summaryRes.json())
    } catch (error) {
      console.error("Failed to fetch attendance data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinConfirm = async () => {
    if (!activeSession) return
    setSubmitting(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attendance/sessions/${activeSession.id}/join`,
        { method: "POST" }
      )
      if (res.ok) {
        setJoinState("joined")
        setConfirming(false)
        setElapsed(0)
      }
    } catch (error) {
      console.error("Failed to join session:", error)
    } finally {
      setSubmitting(false)
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
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
            <div className="h-4 w-32 bg-gray-100 rounded mb-3" />
            <div className="h-3 w-48 bg-gray-100 rounded" />
          </div>
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
          <Link href="/student" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Back to home
          </Link>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mt-2">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Your attendance records and active sessions.</p>
        </div>

        {/* Active session banner */}
        {activeSession && joinState === "idle" && !confirming && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-blue-800">Active session in your classroom</p>
                </div>
                <p className="text-base font-medium text-blue-900">{activeSession.topic}</p>
                <p className="text-xs text-blue-700 mt-0.5">{activeSession.course_name}</p>
              </div>
              <button
                onClick={() => setConfirming(true)}
                className="h-9 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-[0.99] transition"
              >
                Join session
              </button>
            </div>
          </div>
        )}

        {/* Confirmation screen */}
        {confirming && activeSession && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <p className="text-sm font-medium text-gray-900 mb-1">Confirm attendance</p>
            <p className="text-sm text-gray-500 mb-5">
              You are about to mark your attendance for{" "}
              <span className="font-medium text-gray-900">{activeSession.course_name}</span> —{" "}
              <span className="font-medium text-gray-900">{activeSession.topic}</span>.
              Your presence will be tracked from the time you join until the session ends.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleJoinConfirm}
                disabled={submitting}
                className="h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.99] transition disabled:opacity-50"
              >
                {submitting ? "Joining..." : "Confirm & join"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="h-9 px-4 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Joined session panel */}
        {joinState === "joined" && activeSession && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-green-800">You are in this session</p>
                </div>
                <p className="text-base font-medium text-green-900">{activeSession.topic}</p>
                <p className="text-xs text-green-700 mt-0.5">{activeSession.course_name}</p>
                <p className="text-xs text-green-600 mt-2">Time in session: {formatElapsed(elapsed)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600">Attendance is being tracked automatically.</p>
                <p className="text-xs text-green-500 mt-1">Stay until the teacher ends the session.</p>
              </div>
            </div>
          </div>
        )}

        {/* No active session */}
        {!activeSession && joinState === "idle" && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-300 rounded-full" />
              <p className="text-sm text-gray-400">No active session in your classroom right now.</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("summary")}
            className="px-4 py-2 text-sm font-medium rounded-lg border transition"
            style={{
              borderColor: activeTab === "summary" ? "#111827" : "#e5e7eb",
              backgroundColor: activeTab === "summary" ? "#111827" : "transparent",
              color: activeTab === "summary" ? "#fff" : "#6b7280",
            }}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className="px-4 py-2 text-sm font-medium rounded-lg border transition"
            style={{
              borderColor: activeTab === "records" ? "#111827" : "#e5e7eb",
              backgroundColor: activeTab === "records" ? "#111827" : "transparent",
              color: activeTab === "records" ? "#fff" : "#6b7280",
            }}
          >
            All Records
          </button>
        </div>

        {/* Summary tab */}
        {activeTab === "summary" && (
          <>
            {summary.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <p className="text-sm text-gray-400">No attendance summary found.</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Course</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Present</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Total</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                        <td className="px-5 py-4 font-medium text-gray-900">{row.course}</td>
                        <td className="px-5 py-4 text-gray-600">{row.present}</td>
                        <td className="px-5 py-4 text-gray-600">{row.total}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                              row.percentage >= 90
                                ? "bg-green-50 text-green-700"
                                : row.percentage >= 75
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {row.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Records tab */}
        {activeTab === "records" && (
          <>
            {records.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <p className="text-sm text-gray-400">No attendance records found.</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Course</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                        <td className="px-5 py-4 font-medium text-gray-900">{row.course}</td>
                        <td className="px-5 py-4 text-gray-600">{row.date}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                              row.status === "present"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {row.status === "present" ? "Present" : "Absent"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}