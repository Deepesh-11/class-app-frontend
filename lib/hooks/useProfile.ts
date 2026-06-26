"use client"

import { useEffect, useState } from "react"
import { getProfile } from "@/lib/api/profile"

export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (err) {
        console.error("Profile fetch failed:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { profile, loading }
}