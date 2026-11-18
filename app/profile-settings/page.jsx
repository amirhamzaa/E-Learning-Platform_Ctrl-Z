import { ProfileSettingsView } from "@/components/profile/ProfileSettingsView";

export const metadata = {
  title: "Profile Settings | Shikhbe Shobai",
  description:
    "Manage faculty account details, teaching credentials, security & 2FA, notification channels, and payout methods.",
};

export default function ProfileSettingsPage() {
  return <ProfileSettingsView />;
}
