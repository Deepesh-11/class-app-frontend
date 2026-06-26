"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { verifyOtp, getMe } from "@/lib/api/auth"

interface OtpFormProps {
  email: string
  onBack: () => void
}


export default function OtpForm({ email, onBack }: OtpFormProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("")
    if (pasted.some((c) => !/^\d$/.test(c))) return
    const newOtp = [...otp]
    pasted.forEach((char, i) => { newOtp[i] = char })
    setOtp(newOtp)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleSubmit = async () => {
    const code = otp.join("")
    if (code.length < 6) {
      setError("Please enter the full 6-digit code.")
      return
    }
    setLoading(true)
    setError("")
    try {
      await verifyOtp(email, code, rememberMe)       // sets the cookie
      const { role } = await getMe()                 // read role from API
      router.push(`/dashboard/${role}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError("")
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
    } catch {
      setError("Could not resend OTP. Please try again.")
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-10 w-full max-w-md">

      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.477 10-9 10S3 18.523 3 13c0-.538.046-1.064.134-1.578L12 14z" />
          </svg>
        </div>
        <span className="text-base font-medium text-gray-900">ClassPlus</span>
      </div>

      <h1 className="text-2xl font-medium text-gray-900 mb-1 tracking-tight">Check your email</h1>
      <p className="text-sm text-gray-500 mb-7">
        We sent a one-time code to <span className="text-gray-800 font-medium">{email}</span>.
      </p>

      {/* OTP inputs */}
      <div className="flex gap-2 mb-6" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-full h-12 text-center text-lg font-medium text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
          />
        ))}
      </div>

      {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

      {/* Remember me */}
      <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none group">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-gray-900 peer-checked:border-gray-900 transition" />
          <svg
            className="absolute inset-0 m-auto w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition">
          Remember me for 30 days
        </span>
      </label>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-10 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Verifying…" : "Verify & continue"}
      </button>

      {/* Resend */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Didn&apos;t receive a code?{" "}
        <button onClick={handleResend} className="text-gray-900 font-medium hover:underline">
          Resend
        </button>
      </p>

      {/* Back */}
      <button
        onClick={onBack}
        className="w-full mt-3 text-xs text-gray-500 hover:text-gray-800"
      >
        ← Back to sign in
      </button>
    </div>
  )
}