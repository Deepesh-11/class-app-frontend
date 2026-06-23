import { NoticeResponse, TargetRole } from "@/lib/types/notice"

const BASE = "/api/notices"

export async function getNotices(): Promise<NoticeResponse[]> {
    const res = await fetch(BASE, { credentials: "include" })
    if (!res.ok) throw new Error("Failed to fetch notices")
    return res.json()
}

export async function createNotice(data: {
    title: string
    body: string
    target_role: TargetRole
}): Promise<NoticeResponse> {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const err = await res.json()
        const message = Array.isArray(err.detail)
            ? err.detail.map((e: any) => e.msg).join(", ")
            : err.detail ?? "Failed to create notice"
        throw new Error(message)
    }
    return res.json()
}

export async function deactivateNotice(notice_id: number): Promise<void> {
    const res = await fetch(`${BASE}/${notice_id}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to deactivate notice")
}

export async function deleteNotice(notice_id: number): Promise<void> {
    const res = await fetch(`${BASE}/${notice_id}/delete`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to delete notice")
}