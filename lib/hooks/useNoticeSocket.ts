"use client"

import { useEffect, useState } from "react"
import { NoticeResponse } from "@/lib/types/notice"
import { toast } from "sonner"

export function useNoticeSocket(
) {
    const [notices, setNotices] = useState<NoticeResponse[]>([])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const wsUrl =
            `${process.env.NEXT_PUBLIC_WS_URL}/notices/ws`

        const socket = new WebSocket(wsUrl)

        socket.onopen = () => {
            setConnected(true)
        }

        socket.onclose = () => {
            setConnected(false)
        }

        socket.onmessage = (event) => {

            const notice = JSON.parse(event.data)

            setNotices(prev => [
                notice,
                ...prev,
            ])

            toast.info(notice.title, {
                description: notice.body,
                duration: 5000,
            })
        }

        return () => socket.close()
    }, [])

    return {
        notices,
        connected,
    }
}