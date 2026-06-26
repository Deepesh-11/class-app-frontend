"use client"

import { useState, useEffect, useCallback } from "react"
import { getNotices, createNotice, deactivateNotice, deleteNotice } from "@/lib/api/notices"
import { NoticeResponse, TargetRole } from "@/lib/types/notice"

export function useNotices() {
    const [notices, setNotices] = useState<NoticeResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetch = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getNotices()
            setNotices(data)
        } catch (e) {
            setError((e as Error).message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetch() }, [fetch])

    async function add(data: { title: string; body: string; target_role: TargetRole }) {
        const result = await createNotice(data)
        await fetch()
        return result
    }

    async function deactivate(notice_id: number) {
        await deactivateNotice(notice_id)
        await fetch()
    }

    async function remove(notice_id: number) {
        await deleteNotice(notice_id)
        await fetch()
    }

    return { notices, loading, error, refresh: fetch, add, deactivate, remove }
}