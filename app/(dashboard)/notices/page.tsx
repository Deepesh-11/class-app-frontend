"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type Notice = {
  id: number
  title: string
  message: string
  created_at: string
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notices/`)
        if (res.ok) setNotices(await res.json())
      } catch (error) {
        console.error("Failed to fetch notices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-7 w-48 bg-gray-200 rounded mb-8" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 mb-3">
              <div className="h-4 w-48 bg-gray-100 rounded mb-3" />
              <div className="h-3 w-full bg-gray-100 rounded mb-2" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
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
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Notices</h1>
          <p className="text-sm text-gray-500 mt-1">All active announcements from your institution.</p>
        </div>

        {/* Notices list */}
        {notices.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">No notices yet</p>
            <p className="text-xs text-gray-400">Active announcements from your institution will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="text-sm font-medium text-gray-900">{notice.title}</p>
                  <span className="text-xs text-gray-400 shrink-0">{formatDate(notice.created_at)}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{notice.message}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}