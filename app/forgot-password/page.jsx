import Image from "next/image";
import { CheckCircle2, Gauge, Headset } from "lucide-react";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { ForgotPasswordCard } from "@/components/auth/ForgotPasswordCard";
import { SITE_ASSETS } from "@/data/homepage";

export const metadata = {
  title: "Forgot Password | Shikhbe Shobai LMS",
  description:
    "Recover your Shikhbe Shobai student account password securely using your registered email address or Student ID.",
};

const RECOVERY_TRUST_BADGES = [
  { id: "ssl", label: "256-Bit SSL Secured", icon: "check" },
  { id: "otp", label: "Instant OTP Delivery", icon: "speed" },
  { id: "hotline", label: "Dhaka Hotline 24/7", icon: "support" },
];

function renderBadgeIcon(icon) {
  const iconClass = "w-4 h-4 text-tertiary shrink-0";
  switch (icon) {
    case "check":
      return <CheckCircle2 className={iconClass} aria-hidden="true" />;
    case "speed":
      return <Gauge className={iconClass} aria-hidden="true" />;
    case "support":
      return <Headset className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full relative isolate overflow-hidden py-space-xl px-gutter-mobile sm:px-gutter items-center justify-center min-h-[calc(100vh-140px)]">
          {/* Ambient Soft Orbs */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-36 -right-28 w-[420px] h-[420px] rounded-full bg-tertiary-fixed/40 blur-3xl pointer-events-none"
          />

          <div className="w-full max-w-md mx-auto relative z-10">
            {/* Editorial Logo Crest & Recovery Pill */}
            <div className="flex flex-col items-center mb-space-lg text-center">
              <div className="h-16 w-auto flex items-center justify-center p-2 rounded-xl bg-surface-container-lowest shadow-sm mb-space-sm">
                <Image
                  src={SITE_ASSETS.logo}
                  alt="Shikhbe Shobai Logo"
                  width={180}
                  height={74}
                  priority
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption tracking-wider uppercase">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-tertiary"
                />
                <span>Account Security &amp; Recovery</span>
              </div>
            </div>

            {/* Forgot Password Recovery Card */}
            <ForgotPasswordCard />

            {/* Trust Badges Strip */}
            <div className="mt-space-lg flex flex-wrap items-center justify-center gap-x-space-lg gap-y-2 text-on-surface-variant font-caption text-caption">
              {RECOVERY_TRUST_BADGES.map((badge) => (
                <div key={badge.id} className="flex items-center gap-1.5">
                  {renderBadgeIcon(badge.icon)}
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
