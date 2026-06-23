import { ClassroomResponse, ClassroomDetail, StudentInClassroom, CourseInClassroom } from "@/lib/types/classroom"

const BASE = "/api/admin/classrooms"

export async function getClassrooms(): Promise<ClassroomResponse[]> {
    const res = await fetch(BASE, { credentials: "include" })
    if (!res.ok) throw new Error("Failed to fetch classrooms")
    return res.json()
}

export async function getClassroom(classroom_id: number): Promise<ClassroomDetail> {
    const res = await fetch(`${BASE}/${classroom_id}`, { credentials: "include" })
    if (!res.ok) throw new Error("Classroom not found")
    return res.json()
}

export async function createClassroom(data: {
    name: string
    section?: string
    academic_year: string
}): Promise<ClassroomResponse> {
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
            : err.detail ?? "Failed to create classroom"
        throw new Error(message)
    }
    return res.json()
}

export async function updateClassroom(
    classroom_id: number,
    data: { name?: string; section?: string; academic_year?: string }
): Promise<ClassroomResponse> {
    const res = await fetch(`${BASE}/${classroom_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const err = await res.json()
        const message = Array.isArray(err.detail)
            ? err.detail.map((e: any) => e.msg).join(", ")
            : err.detail ?? "Failed to update classroom"
        throw new Error(message)
    }
    return res.json()
}

export async function deleteClassroom(classroom_id: number): Promise<void> {
    const res = await fetch(`${BASE}/${classroom_id}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to delete classroom")
}

export async function enrollStudent(
    classroom_id: number,
    data: { student_id: string; roll_no?: string }
): Promise<StudentInClassroom> {
    const res = await fetch(`${BASE}/${classroom_id}/enroll-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const err = await res.json()
        const message = Array.isArray(err.detail)
            ? err.detail.map((e: any) => e.msg).join(", ")
            : err.detail ?? "Failed to enroll student"
        throw new Error(message)
    }
    return res.json()
}

export async function removeStudent(
    classroom_id: number,
    student_id: string
): Promise<void> {
    const res = await fetch(`${BASE}/${classroom_id}/remove-student/${student_id}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to remove student")
}

export async function assignCourse(
    classroom_id: number,
    data: { course_id: number; teacher_id?: number }
): Promise<void> {
    const res = await fetch(`${BASE}/${classroom_id}/assign-course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const err = await res.json()
        const message = Array.isArray(err.detail)
            ? err.detail.map((e: any) => e.msg).join(", ")
            : err.detail ?? "Failed to assign course"
        throw new Error(message)
    }
}

export async function unassignCourse(
    classroom_id: number,
    course_id: number
): Promise<void> {
    const res = await fetch(`${BASE}/${classroom_id}/unassign-course/${course_id}`, {
        method: "PATCH",
        credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to unassign course")
}