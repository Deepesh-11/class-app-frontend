"use client"

import { useState } from "react"
import Link from "next/link"

type Role = "teacher" | "student"

const roles: { value: Role; label: string }[] = [
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
]

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>("student")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })

  // console.log("selected role:", selectedRole)

  const handleSubmit = () => {
    console.log({ ...formData, role: selectedRole })
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

      <h1 className="text-2xl font-medium text-gray-900 mb-1 tracking-tight">Create an account</h1>
      <p className="text-sm text-gray-500 mb-7">Join ClassPlus to manage your classes.</p>

      {/* Role selector */}
      <p className="text-sm font-medium text-gray-500 mb-2">I am a</p>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => setSelectedRole(role.value)}
            className={`h-10 text-sm font-medium rounded-lg border transition-all ${
              selectedRole === role.value
                ? "!border-gray-900 !bg-gray-900 !text-white"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            {role.label}
          </button>
        ))}
</div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
          <input
            type="text"
            placeholder="Deepesh"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
          <input
            type="text"
            placeholder="Khanal"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full h-10 px-3 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
        <input
          type="text"
          placeholder="+977 98XXXXXXXX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
        />
        <p className="text-xs text-gray-400 mt-1">You&apos;ll receive an OTP on this number.</p>
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full h-10 px-3 pr-10 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full h-10 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.99] transition"
      >
        Create account
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-gray-900 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}