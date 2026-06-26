export async function login(email: string, password: string) {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Invalid credentials")
  }
  return res.json() // { message, otp } — in prod otp won't be here
}


// export async function verifyOtp(email: string, otp: string) {
//   const res = await fetch("/auth/verify-otp", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, otp }),
//     credentials: "include", // important — sends and receives cookies
//   })
//   if (!res.ok) {
//     const err = await res.json()
//     throw new Error(err.detail ?? "Invalid OTP")
//   }
//   return res.json()
// }

export async function verifyOtp(email: string, otp: string, rememberMe: boolean = false) {
  const res = await fetch("/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, remember_me: rememberMe }),
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Invalid OTP")
  }
  return res.json()
}

export async function getMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Not authenticated")
  return res.json()
}

export async function logout() {
  sessionStorage.removeItem(
    "unread-notice-toast-shown"
  )
  await fetch("/auth/logout", { method: "POST", credentials: "include" })
  window.location.href = "/login"
}

