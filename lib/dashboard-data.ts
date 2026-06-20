export const nav = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Overview", href:"/dashboard/admin" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Students", href:"/dashboard/admin/students" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Assignments", href:"/" },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Schedule", href:"/" },
  // { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics" },
  // { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Settings" },
]

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
