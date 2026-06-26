import { NoticeProvider } from "@/context/NoticeContext"

export default function StudentLayout({
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