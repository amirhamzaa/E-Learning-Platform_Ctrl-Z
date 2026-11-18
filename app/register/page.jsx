import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  GraduationCap,
  Headset,
  MessageSquareText,
  Users,
} from "lucide-react";
import { Fragment } from "react";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { RegisterFormCard } from "@/components/auth/RegisterFormCard";
import { SITE_ASSETS } from "@/data/homepage";
import { REGISTER_GUIDANCE_LINKS, REGISTER_TRUST_PERKS } from "@/data/register";

export const metadata = {
  title: "Student Registration | Shikhbe Shobai LMS",
  description:
    "Create your Shikhbe Shobai learner account and join over 68,000+ Bangladeshi tech professionals, creative practitioners, and career-track students.",
};

function renderPerkIcon(icon) {
  const iconClass = "w-5 h-5 text-tertiary shrink-0";
  switch (icon) {
    case "explore":
      return <Compass className={iconClass} aria-hidden="true" />;
    case "groups":
      return <Users className={iconClass} aria-hidden="true" />;
    case "sms":
      return <MessageSquareText className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

function renderGuidanceIcon(icon) {
  const iconClass = "w-[18px] h-[18px] shrink-0";
  switch (icon) {
    case "school":
      return <GraduationCap className={iconClass} aria-hidden="true" />;
    case "support":
      return <Headset className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export default function RegisterPage() {
  return (
    <>
      <AuthHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full relative isolate overflow-hidden py-space-xl">
          {/* Subtle Architectural Atmospheric Glows */}
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute top-[480px] -right-40 w-96 h-96 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 -left-40 w-[420px] h-[420px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"
          />

          {/* Main Enrollment Sanctuary */}
          <div className="w-full max-w-xl mx-auto px-gutter-mobile sm:px-gutter relative z-10">
            {/* Editorial Brand Crest */}
            <div className="flex flex-col items-center text-center mb-space-lg">
              <div className="relative mb-space-sm p-space-xs rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center">
                <Image
                  src={SITE_ASSETS.logo}
                  alt="Shikhbe Shobai Logo"
                  width={180}
                  height={74}
                  priority
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Badge Indicator */}
              <div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-tertiary-fixed-dim/30 text-tertiary font-label-sm text-label-sm tracking-wide mb-space-sm">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"
                />
                <span>New Student Enrollment</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight mb-space-xs">
                Create Your Learner Account
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Join over 68,000+ Bangladeshi tech professionals, creative
                practitioners, and career-track students.
              </p>
            </div>

            {/* Registration Card */}
            <RegisterFormCard />

            {/* Trust & Perks Pillar Banner */}
            <div className="mt-space-lg rounded-xl p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-around gap-space-sm text-center">
              {REGISTER_TRUST_PERKS.map((perk, index) => (
                <Fragment key={perk.id}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline text-outline-variant"
                    >
                      •
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    {renderPerkIcon(perk.icon)}
                    <span className="font-body-sm text-body-sm">
                      {perk.label}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* Supplementary Quick Guidance */}
            <div
              id="instructor-apply"
              className="mt-space-md flex flex-wrap items-center justify-center gap-x-space-md gap-y-2 text-center"
            >
              {REGISTER_GUIDANCE_LINKS.map((item, index) => (
                <Fragment key={item.id}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline text-outline-variant"
                    >
                      /
                    </span>
                  )}
                  <Link
                    href={item.href}
                    data-path={item.plannedRoute}
                    className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors inline-flex items-center gap-1.5"
                  >
                    {renderGuidanceIcon(item.icon)}
                    <span>{item.label}</span>
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
