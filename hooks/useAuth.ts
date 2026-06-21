import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/authStore"
import { LoginPayload, OtpPayload } from "@/types/user"

export function useAuth() {
  const router = useRouter()
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginPayload) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.login(payload)
      setAuth(res.user, res.access_token)
      router.push("/verify-otp")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (payload: OtpPayload) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.verifyOtp(payload)
      setAuth(res.user, res.access_token)
      redirectByRole(res.user.role)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "OTP verification failed")
    } finally {
      setLoading(false)
    }
  }

  const redirectByRole = (role: string) => {
    if (role === "admin") router.push("/dashboard/admin")
    else if (role === "teacher") router.push("/teacher")
    else if (role === "student") router.push("/student")
    else router.push("/login")
  }

  const logout = () => {
    clearAuth()
    router.push("/login")
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    verifyOtp,
    logout,
  }
}