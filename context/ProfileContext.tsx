"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type Profile = {
  id: number
  name: string
  role?: "student" | "teacher" | "admin"
}

type ProfileContextType = {
  profile: Profile | null
  loading: boolean
}

const ProfileContext = createContext<ProfileContextType | null>(null)

export function ProfileProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            credentials: "include",
          }
        )

        if (!res.ok) {
          setProfile(null)
          return
        }

        const data = await res.json()
        setProfile(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error(
      "useProfile must be used within ProfileProvider"
    )
  }

  return context
}