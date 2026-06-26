"use client"

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef
} from "react"

import { toast } from "sonner"

import { useNoticeSocket } from "@/lib/hooks/useNoticeSocket"
import { getUnreadNoticeCount } from "@/lib/api/notices"
import { NoticeResponse } from "@/lib/types/notice"
import { useProfile } from "./ProfileContext"

type NoticeContextType = {
  notices: NoticeResponse[]
  connected: boolean
}

const NoticeContext =
  createContext<NoticeContextType | null>(null)

export function NoticeProvider({
  children,
}: {
  children: ReactNode
}) {

  const {profile, loading} = useProfile()
  const noticeData = useNoticeSocket(profile?.role)
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    if (hasCheckedRef.current) return

    hasCheckedRef.current = true

    async function checkUnreadNotices() {
      try {
        const alreadyShown = sessionStorage.getItem(
          "unread-notice-toast-shown"
        )

        if (alreadyShown) return

        const result = await getUnreadNoticeCount()

        if (result.count > 0) {
          toast.info("Unread Notices", {
            description: `You have ${result.count} unread notice${result.count > 1 ? "s" : ""
              }.`,
          })

          sessionStorage.setItem(
            "unread-notice-toast-shown",
            "true"
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkUnreadNotices()
  }, [])

  return (
    <NoticeContext.Provider value={noticeData}>
      {children}
    </NoticeContext.Provider>
  )
}

export function useNoticeContext() {
  const context = useContext(NoticeContext)

  if (!context) {
    throw new Error(
      "useNoticeContext must be used within NoticeProvider"
    )
  }

  return context
}