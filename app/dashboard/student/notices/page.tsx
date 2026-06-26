"use client"

import { useEffect, useState } from "react"

type Notice = {
  id: number
  title: string
  body: string
  created_at: string
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices/my", {
          credentials: "include",
        })

        if (!res.ok) {
          throw new Error("Failed to load notices")
        }

        const data = await res.json()
        setNotices(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-72 rounded bg-gray-200" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-4 h-5 w-1/3 rounded bg-gray-200" />
                <div className="mb-2 h-4 rounded bg-gray-100" />
                <div className="mb-2 h-4 rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Notices
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Notices relevant to your account.
          </p>
        </div>

        {notices.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              📢
            </div>

            <h2 className="text-sm font-semibold text-gray-900">
              No notices available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Any notices sent to your role will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {notice.title}
                  </h2>

                  <span className="whitespace-nowrap text-xs text-gray-400">
                    {formatDate(notice.created_at)}
                  </span>
                </div>

                <p className="whitespace-pre-wrap leading-7 text-gray-600">
                  {notice.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}