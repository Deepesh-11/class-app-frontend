export async function getProfile() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
    method: "GET",
    credentials: "include", // IMPORTANT if token is in cookies
  })

  if (!res.ok) {
    throw new Error("Failed to fetch profile")
  }

  return res.json()
}