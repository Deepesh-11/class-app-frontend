export async function login(email: string, password: string) {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Invalid credentials")
  }
  return res.json() // { message, otp } — in prod otp won't be here
}


export async function verifyOtp(email: string, otp: string) {
  const res = await fetch("/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
    credentials: "include", // important — sends and receives cookies
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? "Invalid OTP")
  }
  return res.json()
}

export async function logout() {
  await fetch("/auth/logout", { method: "POST", credentials: "include" })
  window.location.href = "/login"
}

