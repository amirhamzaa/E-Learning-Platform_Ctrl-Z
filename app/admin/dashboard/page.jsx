import { AdminAnalyticsSection } from "@/components/admin/AdminAnalyticsSection";
import { AdminApprovalQueue } from "@/components/admin/AdminApprovalQueue";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";
import { AdminHeaderRibbon } from "@/components/admin/AdminHeaderRibbon";
import { AdminKpiGrid } from "@/components/admin/AdminKpiGrid";
import { AdminOrdersAndFeed } from "@/components/admin/AdminOrdersAndFeed";

export const metadata = {
  title: "Admin Dashboard | Shikhbe Shobai LMS",
  description:
    "Superadmin Control Center for Shikhbe Shobai LMS: platform KPIs, enrollment analytics, payment channels, approval queue, orders, and system health.",
};

export default function AdminDashboardPage() {
  return (
    <AdminDashboardShell>
      <AdminHeaderRibbon />
      <AdminKpiGrid />
      <AdminAnalyticsSection />
      <AdminApprovalQueue />
      <AdminOrdersAndFeed />
    </AdminDashboardShell>
  );
}
