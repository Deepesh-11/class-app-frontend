// app/dashboard/teacher/sessions/[sessionId]/room/page.tsx
"use client"
import { useParams } from "next/navigation"
import ClassRoom from "@/components/dashboard/classrooms/Classroom"

export default function TeacherSessionRoomPage() {
  const { sessionId } = useParams()

  return (
    <ClassRoom
      sessionId={Number(sessionId)}
      isTeacher={true}
      apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
      onLeave={() => (window.location.href = "/dashboard/teacher")}
    />
  )
}