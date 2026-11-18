import { AttendanceAnalyticsView } from "@/components/academics/AttendanceAnalyticsView";

export const metadata = {
  title: "Attendance Analytics | Shikhbe Shobai",
  description:
    "Student attendance analytics, matrix heatmap calendar, monthly participation trajectory, and class-wise log.",
};

export default function AttendancePage() {
  return <AttendanceAnalyticsView />;
}
