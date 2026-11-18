import { InstructorDashboardView } from "@/components/instructor/InstructorDashboardView";

export const metadata = {
  title: "Instructor Dashboard | Shikhbe Shobai",
  description:
    "Faculty mentor workspace for managing live batches, course performance, assignment reviews, and student Q&A.",
};

export default function InstructorDashboardPage() {
  return <InstructorDashboardView />;
}
