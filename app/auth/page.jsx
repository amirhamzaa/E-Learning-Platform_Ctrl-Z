import { AuthSuiteView } from "@/components/auth/AuthSuiteView";

export const metadata = {
  title: "Authentication Suite | Shikhbe Shobai",
  description:
    "Unified tabbed academic authentication hub covering Student Login, Student Registration, Instructor Application, and 6-Digit OTP Recovery.",
};

export default function AuthSuitePage() {
  return <AuthSuiteView />;
}
