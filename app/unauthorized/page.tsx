"use client"

import Link from "next/link"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500">
            Error 403
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Access Denied
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            You don't have permission to access this page. If you believe this
            is an error, please contact your administrator.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
         </Link>
        </div>
      </div>
    </div>
  )
}