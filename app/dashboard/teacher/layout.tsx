import { NoticeProvider } from "@/context/NoticeContext"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NoticeProvider>
      {children}
    </NoticeProvider>
  )
}