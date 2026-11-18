import { StudentAttendanceDetailsView } from "@/components/academics/StudentAttendanceDetailsView";

export const metadata = {
  title: "Individual Student Attendance Details | Shikhbe Shobai",
  description:
    "Course-specific individual student attendance audit log, certificate eligibility status, and faculty remarks.",
};

export default function AttendanceDetailsPage() {
  return <StudentAttendanceDetailsView />;
}
