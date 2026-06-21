import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User } from "@/types/user"
import { authStorage } from "@/lib/auth"

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        authStorage.setToken(token)
        authStorage.setUser(user)
        set({ user, token, isAuthenticated: true })
      },

      clearAuth: () => {
        authStorage.clear()
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: "classplus_auth",
    }
  )
)