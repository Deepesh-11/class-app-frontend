export const nav = {
  admin: [
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Overview",
      href: "/dashboard/admin",
    },
    {
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      label: "Students",
      href: "/dashboard/admin/students",
    },
    {
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      label: "Teachers",
      href: "/dashboard/admin/teachers",
    },
    {
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      label: "Classrooms",
      href: "/dashboard/admin/classrooms",
    },
    {
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      label: "Notices",
      href: "/dashboard/admin/notices",
    },
  ],

  teacher: [
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Overview",
      href: "/dashboard/teacher",
    },
    {
      icon: "M9 5H7a2 2 0 00-2 2v12...M3 6a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM8 20h8M12 17v3M7 10h10M7 13h6",
      label: "Classrooms",
      href: "/dashboard/teacher/classrooms",
    },

    {
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      label: "Notices",
      href: "/dashboard/teacher/notices",
    },
  ],

  student: [
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Overview",
      href: "/dashboard/student",
    },
    {
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      label: "Attendance",
      href: "/dashboard/student/attendance",
    },
    {
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      label: "Notices",
      href: "/dashboard/student/notices",
    },
  ],
}

export const stats = [
  { label: "Total students", value: "1,284", change: "+12 this week", up: true },
  { label: "Active courses", value: "38", change: "+3 this month", up: true },
  { label: "Avg. attendance", value: "87%", change: "-2% vs last term", up: false },
  { label: "Assignments due", value: "14", change: "3 overdue", up: false },
]

export const recentStudents = [
  { name: "Priya Sharma", course: "Biology — Grade 11", status: "Active", score: 94 },
  { name: "James Okafor", course: "Calculus — Grade 12", status: "Active", score: 88 },
  { name: "Mia Chen", course: "World History — Grade 10", status: "Inactive", score: 71 },
  { name: "Lucas Ferreira", course: "Physics — Grade 11", status: "Active", score: 82 },
  { name: "Amara Diallo", course: "English Lit — Grade 12", status: "Active", score: 96 },
]

export const upcoming = [
  { title: "Grade 11 Biology midterm", date: "Today", time: "9:00 AM", tag: "Exam" },
  { title: "Parent-teacher conference", date: "Tomorrow", time: "2:00 PM", tag: "Meeting" },
  { title: "Grade 12 Calculus quiz", date: "Wed", time: "10:30 AM", tag: "Quiz" },
  { title: "Science fair submissions", date: "Fri", time: "5:00 PM", tag: "Deadline" },
]
