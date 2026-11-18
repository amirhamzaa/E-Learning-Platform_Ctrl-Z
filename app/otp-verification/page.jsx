import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Lock, ShieldCheck } from "lucide-react";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { OtpVerificationCard } from "@/components/auth/OtpVerificationCard";
import { SITE_ASSETS } from "@/data/homepage";

export const metadata = {
  title: "OTP Verification | Shikhbe Shobai LMS",
  description:
    "Verify your 6-digit one-time password to securely confirm your Shikhbe Shobai identity.",
};

export default function OtpVerificationPage() {
  return (
    <>
      <AuthHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <div className="relative isolate w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-gutter-mobile sm:px-gutter py-space-xl overflow-hidden bg-surface">
            {/* Ambient layered warm glow orbs */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-tertiary-fixed/40 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-surface-container-high/40 blur-2xl pointer-events-none"
            />

            {/* Central Authentication Frame */}
            <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
              {/* Brand Logo Header with Artisan Badge */}
              <div className="flex flex-col items-center mb-space-md text-center">
                <div className="relative flex items-center justify-center p-space-sm bg-surface-container-lowest shadow-sm rounded-xl mb-space-xs">
                  <Image
                    src={SITE_ASSETS.logo}
                    alt="Shikhbe Shobai Emblem"
                    width={180}
                    height={74}
                    priority
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-tertiary-fixed/50 text-tertiary font-label-sm text-label-sm tracking-wide">
                  <ShieldCheck
                    className="w-[15px] h-[15px] shrink-0"
                    aria-hidden="true"
                  />
                  <span>IDENTITY VERIFICATION</span>
                </div>
              </div>

              {/* Main Security Card */}
              <OtpVerificationCard />

              {/* Security Trust Guarantee Card / Footnote */}
              <div className="w-full mt-space-md bg-surface-container-low rounded-xl p-space-md shadow-sm">
                <div className="flex items-start gap-space-sm">
                  <div className="p-1.5 rounded-lg bg-surface-container-lowest text-primary-container shrink-0 mt-0.5">
                    <Lock className="w-[18px] h-[18px]" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold flex flex-wrap items-center gap-1.5">
                      <span>Security Guarantee</span>
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-tertiary-container inline-block"
                      />
                      <span className="font-caption text-caption text-on-surface-variant font-normal">
                        Encrypted Session
                      </span>
                    </span>
                    <p className="font-caption text-caption text-on-surface-variant leading-relaxed">
                      Secured by BTRC SMS Gateway &amp; OAuth 2.0. Never share
                      this code with anyone, including Shikhbe Shobai staff.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Back Nav & Help Link */}
              <div className="w-full mt-space-md flex items-center justify-between text-on-surface-variant px-space-xs font-caption text-caption">
                <Link
                  href="/login"
                  data-path="student-login"
                  className="inline-flex items-center gap-1 hover:text-on-surface transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Return to Student Login</span>
                </Link>
                <Link
                  href="/#footer-contact"
                  data-path="contact"
                  className="hover:text-on-surface transition-colors inline-flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Need Help?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
