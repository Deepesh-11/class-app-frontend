import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get("token")?.value
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathStr = path.join("/")
  const token = await getToken()

  const res = await fetch(`http://127.0.0.1:8000/${pathStr}`, {
    headers: {
      ...(token && { Cookie: `token=${token}` }),
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathStr = path.join("/")
  const token = await getToken()
  const body = await request.json().catch(() => null)

  const res = await fetch(`http://127.0.0.1:8000/${pathStr}`, {
    method: "POST",
    headers: {
      ...(token && { Cookie: `token=${token}` }),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()
  const response = NextResponse.json(data, { status: res.status })
  const setCookie = res.headers.get("set-cookie")
  if (setCookie) response.headers.set("set-cookie", setCookie)
  return response
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathStr = path.join("/")
  const token = await getToken()
  const body = await request.json().catch(() => null)

  const res = await fetch(`http://127.0.0.1:8000/${pathStr}`, {
    method: "PATCH",
    headers: {
      ...(token && { Cookie: `token=${token}` }),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathStr = path.join("/")
  const token = await getToken()

  const res = await fetch(`http://127.0.0.1:8000/${pathStr}`, {
    method: "DELETE",
    headers: {
      ...(token && { Cookie: `token=${token}` }),
    },
  })

  if (res.status === 204) return new NextResponse(null, { status: 204 })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}