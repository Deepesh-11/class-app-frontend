"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user?.role === "admin") router.push("/dashboard/admin")
    else if (user?.role === "teacher") router.push("/teacher")
    else if (user?.role === "student") router.push("/student")
    else router.push("/login")
  }, [isAuthenticated, user, router])

  return null
}