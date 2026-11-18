import Image from "next/image";
import { BadgeCheck, Lock } from "lucide-react";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { ResetPasswordCard } from "@/components/auth/ResetPasswordCard";
import { SITE_ASSETS } from "@/data/homepage";

export const metadata = {
  title: "Reset Password | Shikhbe Shobai LMS",
  description:
    "Set a new strong password for your Shikhbe Shobai learner account.",
};

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <div className="relative isolate w-full overflow-hidden py-space-xl px-gutter-mobile sm:px-gutter flex items-center justify-center min-h-[calc(100vh-140px)]">
            {/* Atmospheric Ambient Lighting Elements */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-20 w-[420px] h-[420px] rounded-full bg-tertiary-fixed/40 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-surface-container-low/60 rounded-full blur-[120px] pointer-events-none -z-10"
            />

            {/* Centered Editorial Card Container */}
            <div className="relative z-10 w-full max-w-md mx-auto">
              {/* Logo Branding Node */}
              <div className="flex flex-col items-center justify-center mb-space-lg text-center">
                <div className="inline-flex items-center justify-center p-space-xs rounded-xl transition-transform duration-300 hover:scale-[1.02]">
                  <Image
                    src={SITE_ASSETS.logo}
                    alt="Shikhbe Shobai Emblem"
                    width={220}
                    height={90}
                    priority
                    className="h-16 w-auto object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Main Surface Elevation */}
              <ResetPasswordCard />

              {/* Footer Micro Trust Assurance */}
              <div className="mt-space-md flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-on-surface-variant font-caption text-caption text-center">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span aria-hidden="true" className="text-outline-variant">
                  •
                </span>
                <span className="inline-flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Shikhbe Shobai Auth System</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
