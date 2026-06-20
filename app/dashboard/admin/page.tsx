import StatsGrid from "@/components/dashboard/StatsGrid"
import StudentsTable from "@/components/dashboard/StudentsTable"
import UpcomingPanel from "@/components/dashboard/UpcomingPanel"
import AttendanceChart from "@/components/dashboard/AttendanceChart"

export default function OverviewPage() {
  return (
    <>
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><StudentsTable /></div>
        <UpcomingPanel />
      </div>
      <AttendanceChart />
    </>
  )
}
