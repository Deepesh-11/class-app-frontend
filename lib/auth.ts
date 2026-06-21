const TOKEN_KEY = "classplus_token"
const USER_KEY = "classplus_user"

export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(TOKEN_KEY)
  },

  getUser: () => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  setUser: (user: unknown): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(USER_KEY)
  },

  clear: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}