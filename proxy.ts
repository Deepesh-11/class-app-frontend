import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    const role = payload.role as string

    const isAdminRoute = pathname.startsWith("/dashboard/admin")
    const isTeacherRoute = pathname.startsWith("/dashboard/teacher")
    const isStudentRoute = pathname.startsWith("/dashboard/student")

    if (
      (isAdminRoute && role !== "admin") ||
      (isTeacherRoute && role !== "teacher") ||
      (isStudentRoute && role !== "student")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
