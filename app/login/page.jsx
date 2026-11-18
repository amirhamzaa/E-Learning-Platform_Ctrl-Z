import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginContextPanel } from "@/components/auth/LoginContextPanel";
import { LoginFormCard } from "@/components/auth/LoginFormCard";

export const metadata = {
  title: "Student Login | Shikhbe Shobai LMS",
  description:
    "Sign in to your Shikhbe Shobai Student Portal to access enrolled courses, live Zoom classes, and mentor evaluations.",
};

export default function LoginPage() {
  return (
    <>
      <AuthHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full relative isolate overflow-hidden py-space-xl px-gutter-mobile sm:px-gutter items-center justify-center">
          {/* Subtle Ambient Atmospheric Glow Elements */}
          <div
            aria-hidden="true"
            className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-primary-fixed/30 via-tertiary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-10 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-20 w-80 h-80 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none -z-10"
          />

          {/* Main Login Grid / Canvas */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <LoginContextPanel />
            <LoginFormCard />
          </div>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
