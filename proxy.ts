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
    console.log("payload:", payload)
    const role = payload.role as string
    console.log("role:", role)

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    if (pathname.startsWith("/dashboard/teacher") && role !== "teacher") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    if (pathname.startsWith("/dashboard/student") && role !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()

  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
