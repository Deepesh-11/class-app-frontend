"use client"

import { useState, useRef } from "react"
import Link from "next/link"

export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const inputs = useRef<(HTMLInputElement | null)[]>([])

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

  const handleSubmit = () => {
    const code = otp.join("")
    console.log("otp submitted:", code)
    // wire up auth service here later
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

      <h1 className="text-2xl font-medium text-gray-900 mb-1 tracking-tight">Verify your number</h1>
      <p className="text-sm text-gray-500 mb-7">
        Enter the 6-digit code sent to your phone number.
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

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full h-10 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.99] transition"
      >
        Verify
      </button>

      {/* Resend */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Didn&apos;t receive a code?{" "}
        <button className="text-gray-900 font-medium hover:underline">
          Resend
        </button>
      </p>

      {/* Back */}
      <p className="text-center text-sm text-gray-500 mt-3">
        <Link href="/register" className="text-gray-500 hover:text-gray-900">
          ← Back to register
        </Link>
      </p>
    </div>
  )
}