"use client"
import { useParams } from "next/navigation"
import ClassRoom from "@/components/dashboard/classrooms/Classroom"

export default function StudentSessionRoomPage() {
  const { sessionId } = useParams()

  return (
    <ClassRoom
      sessionId={Number(sessionId)}
      isTeacher={false}
      apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
      onLeave={() => (window.location.href = "/dashboard/student/attendance")}
    />
  )
}