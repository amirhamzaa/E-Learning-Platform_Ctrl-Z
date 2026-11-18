import Image from "next/image";
import { HelpCircle, Shield, ShieldCheck } from "lucide-react";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { InstructorRegisterForm } from "@/components/auth/InstructorRegisterForm";
import { SITE_ASSETS } from "@/data/homepage";

export const metadata = {
  title: "Instructor Registration | Shikhbe Shobai LMS",
  description:
    "Apply to become a Shikhbe Shobai instructor. Share your industry expertise, mentor top tech talent across Bangladesh, and earn industry-leading revenue shares.",
};

export default function InstructorRegistrationPage() {
  return (
    <>
      <AuthHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full overflow-hidden">
          {/* Subtle Ambient Top Gradient Canvas */}
          <div className="relative isolate w-full max-w-5xl mx-auto px-gutter-mobile sm:px-gutter py-space-xl">
            {/* Ambient Backdrop Layering (Warm Studio Depth) */}
            <div
              aria-hidden="true"
              className="absolute -top-12 right-12 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none -z-10"
            />
            <div
              aria-hidden="true"
              className="absolute top-1/3 -left-16 w-80 h-80 rounded-full bg-tertiary-fixed/40 blur-3xl pointer-events-none -z-10"
            />

            {/* Header Section with Brand Badge & Specified Logo Image */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
              {/* Logo Asset Presentation */}
              <div className="mb-space-md p-space-sm bg-surface-container-lowest rounded-xl shadow-sm inline-flex items-center justify-center">
                <Image
                  src={SITE_ASSETS.logo}
                  alt="Shikhbe Shobai Bengali Learning Emblem"
                  width={200}
                  height={82}
                  priority
                  className="h-14 w-auto object-contain max-h-16"
                />
              </div>

              {/* Pill Badge for Role Track */}
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-container/40 text-on-secondary-container mb-space-md">
                <ShieldCheck
                  className="w-4 h-4 text-primary-container shrink-0"
                  aria-hidden="true"
                />
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary-container">
                  Faculty &amp; Mentor Program
                </span>
              </div>

              {/* High-Impact Editorial Heading */}
              <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg md:text-display-hero text-on-surface tracking-tight mb-space-sm">
                Apply to Become a Shikhbe Shobai Instructor
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Share your industry expertise, mentor top tech talent across
                Bangladesh, and earn industry-leading revenue shares.
              </p>
            </div>

            {/* Notice Banner (Review Protocol) */}
            <div className="max-w-3xl mx-auto mb-space-lg bg-surface-container-low rounded-xl p-space-md shadow-sm">
              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center shrink-0 text-tertiary">
                  <Shield className="w-[22px] h-[22px]" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-title-md text-title-md text-on-surface">
                    Application Review Notice
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    All mentor applications are reviewed by our Academic Board
                    within 48 business hours. Verified National Identity (NID)
                    and a public portfolio or GitHub record are required prior
                    to syllabus onboarding.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Registration Shell / Structured Form Container */}
            <InstructorRegisterForm />

            {/* Editorial Footer Assistance Note */}
            <div className="max-w-3xl mx-auto mt-space-lg text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low px-space-md py-space-xs rounded-full">
                <HelpCircle
                  className="w-[18px] h-[18px] text-secondary shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Need assistance with your syllabus proposal? Contact
                </span>
                <a
                  href="mailto:faculty@shikhbeshobai.com"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  faculty@shikhbeshobai.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
