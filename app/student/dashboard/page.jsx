import { StudentActivityAndTasks } from "@/components/student/StudentActivityAndTasks";
import { StudentAnnouncements } from "@/components/student/StudentAnnouncements";
import { StudentDashboardShell } from "@/components/student/StudentDashboardShell";
import { StudentKpiGrid } from "@/components/student/StudentKpiGrid";
import { StudentLearningAndLive } from "@/components/student/StudentLearningAndLive";
import { StudentWelcomeBanner } from "@/components/student/StudentWelcomeBanner";

export const metadata = {
  title: "Student Dashboard | Shikhbe Shobai LMS",
  description:
    "Track your active cohorts, syllabus progress, live Zoom classes, weekly learning activity, assignments, and instructor announcements.",
};

export default function StudentDashboardPage() {
  return (
    <StudentDashboardShell>
      <StudentWelcomeBanner />
      <StudentKpiGrid />
      <StudentLearningAndLive />
      <StudentActivityAndTasks />
      <StudentAnnouncements />
    </StudentDashboardShell>
  );
}
