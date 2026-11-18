"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  HelpCircle,
  IdCard,
  Info,
  Loader2,
  Lock,
  Shield,
} from "lucide-react";
import { Fragment, useState } from "react";
import { LOGIN_TRUST_INDICATORS } from "@/data/auth";
import { SITE_ASSETS } from "@/data/homepage";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STUDENT_ID_PATTERN = /^SS-\d{4,8}$/i;

function validateLoginForm(identifier, password) {
  const errors = {};
  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier) {
    errors.identifier = "Email address or Student ID is required.";
  } else if (trimmedIdentifier.includes("@")) {
    if (!EMAIL_PATTERN.test(trimmedIdentifier)) {
      errors.identifier =
        "Please enter a valid email address (e.g. ariful.islam@shikhbeshobai.com).";
    }
  } else if (!STUDENT_ID_PATTERN.test(trimmedIdentifier)) {
    errors.identifier =
      "Enter a valid email address or Student ID (e.g. SS-84920).";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

function renderTrustIcon(icon, colorClass) {
  const iconClass = `w-[17px] h-[17px] shrink-0 ${colorClass}`;
  switch (icon) {
    case "lock":
      return <Lock className={iconClass} aria-hidden="true" />;
    case "verified":
      return <BadgeCheck className={iconClass} aria-hidden="true" />;
    case "security":
      return <Shield className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function LoginFormCard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusNotice(null);

    const validationErrors = validateLoginForm(identifier, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Client-side loading visual feedback only; no backend auth or redirect.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setStatusNotice(
      "Authentication backend is not connected yet. Your form inputs passed client-side validation and are ready for future API integration."
    );
  };

  const handleSocialClick = (provider) => {
    setErrors({});
    setStatusNotice(
      `${provider} sign-in is not connected yet and will be enabled once backend OAuth integration is added.`
    );
  };

  return (
    <div className="lg:col-span-7 flex flex-col items-center w-full">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-[0px_4px_25px_-2px_rgba(107,66,38,0.06),0px_12px_40px_-6px_rgba(107,66,38,0.08)]">
        {/* Header Branding & Pill */}
        <div className="flex flex-col items-center text-center gap-space-xs mb-space-lg">
          {/* Standalone Brand Logo Rule Applied */}
          <div className="mb-space-xs flex justify-center items-center">
            <Image
              src={SITE_ASSETS.logo}
              alt="Shikhbe Shobai Emblem"
              width={200}
              height={82}
              priority
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Page Header Badge */}
          <span className="inline-flex items-center gap-1.5 px-space-md py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold">
            <Lock className="w-[14px] h-[14px]" aria-hidden="true" />
            <span>Learner Portal Access</span>
          </span>

          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-1">
            Welcome Back to Shikhbe Shobai
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Enter your credentials to access your enrolled courses, live Zoom
            classes, and mentor evaluations.
          </p>
        </div>

        {/* Social Single Sign-On Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mb-space-md">
          {/* Google SSO */}
          <button
            type="button"
            onClick={() => handleSocialClick("Google")}
            className="group flex items-center justify-center gap-space-sm px-space-md py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm active:scale-[0.99] text-left"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors truncate">
              Continue with Google
            </span>
          </button>

          {/* GitHub SSO */}
          <button
            type="button"
            onClick={() => handleSocialClick("GitHub")}
            className="group flex items-center justify-center gap-space-sm px-space-md py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm active:scale-[0.99] text-left"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 flex-shrink-0 text-on-surface"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                fillRule="evenodd"
              />
            </svg>
            <span className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors truncate">
              Continue with GitHub
            </span>
          </button>
        </div>

        {/* Sectional Divider */}
        <div className="relative flex items-center justify-center my-space-md">
          <div className="w-full h-[1px] bg-surface-variant" />
          <span className="absolute bg-surface-container-lowest px-space-sm font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold whitespace-nowrap">
            Or sign in with email / student ID
          </span>
        </div>

        {/* Authentication Form */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-space-md"
        >
          {/* Identifier Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="studentIdentifier"
              className="font-label-md text-label-md font-semibold text-on-surface flex flex-wrap items-center justify-between gap-1"
            >
              <span>Email Address or Student ID</span>
              <span className="font-caption text-caption text-on-surface-variant font-normal">
                Active enrollment required
              </span>
            </label>
            <div className="relative flex items-center">
              <IdCard
                aria-hidden="true"
                className="w-5 h-5 absolute left-3.5 text-on-surface-variant pointer-events-none"
              />
              <input
                id="studentIdentifier"
                name="identifier"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(event) => {
                  setIdentifier(event.target.value);
                  if (errors.identifier) {
                    setErrors((prev) => ({ ...prev, identifier: undefined }));
                  }
                  if (statusNotice) setStatusNotice(null);
                }}
                aria-invalid={Boolean(errors.identifier)}
                aria-describedby={
                  errors.identifier ? "studentIdentifier-error" : undefined
                }
                placeholder="e.g. ariful.islam@shikhbeshobai.com or SS-84920"
                required
                className={`w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-4 py-3 rounded-xl placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest transition-all ${
                  errors.identifier
                    ? "ring-2 ring-error/40 focus:shadow-[0_0_0_3px_rgba(186,26,26,0.15)]"
                    : "focus:shadow-[0_0_0_3px_rgba(107,66,38,0.15)]"
                }`}
              />
            </div>
            {errors.identifier && (
              <p
                id="studentIdentifier-error"
                role="alert"
                className="font-caption text-caption text-error flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.identifier}</span>
              </p>
            )}
          </div>

          {/* Password Input with Toggle & Forgot Password Link */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="passwordInput"
                className="font-label-md text-label-md font-semibold text-on-surface"
              >
                Password
              </label>
              <a
                href="#forgot-password"
                data-path="forgot-password"
                className="font-label-sm text-label-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock
                aria-hidden="true"
                className="w-5 h-5 absolute left-3.5 text-on-surface-variant pointer-events-none"
              />
              <input
                id="passwordInput"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                  if (statusNotice) setStatusNotice(null);
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "passwordInput-error" : undefined
                }
                placeholder="••••••••••••"
                required
                className={`w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-11 py-3 rounded-xl placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest transition-all ${
                  errors.password
                    ? "ring-2 ring-error/40 focus:shadow-[0_0_0_3px_rgba(186,26,26,0.15)]"
                    : "focus:shadow-[0_0_0_3px_rgba(107,66,38,0.15)]"
                }`}
              />
              <button
                id="passwordToggleBtn"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 p-1 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="passwordInput-error"
                role="alert"
                className="font-caption text-caption text-error flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <label
              htmlFor="rememberMe"
              className="flex items-center gap-space-xs cursor-pointer select-none"
            >
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Remember me for 30 days
              </span>
            </label>
            <span className="hidden sm:inline font-caption text-caption text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
              Secure Device
            </span>
          </div>

          {/* Primary Submit Button */}
          <button
            id="signInBtn"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`w-full bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md py-3.5 px-space-lg rounded-xl shadow-[0_4px_16px_rgba(107,66,38,0.25)] hover:shadow-[0_6px_22px_rgba(107,66,38,0.32)] transition-all active:scale-[0.99] flex items-center justify-center gap-space-xs mt-space-xs ${
              isSubmitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="w-5 h-5 animate-spin"
                  aria-hidden="true"
                />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Student Dashboard</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        {/* Honest Frontend-Only Integration Status Notice */}
        {statusNotice && (
          <div
            role="status"
            aria-live="polite"
            className="mt-space-md p-space-sm bg-secondary-fixed/50 text-on-secondary-fixed rounded-xl flex items-start gap-space-sm font-body-sm text-body-sm"
          >
            <Info
              className="w-5 h-5 text-primary shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Card Footer Links */}
        <div
          id="student-registration"
          className="mt-space-lg pt-space-md flex flex-col items-center text-center gap-space-xs bg-surface-container-low/60 p-space-md rounded-xl"
        >
          <p className="font-body-sm text-body-sm text-on-surface">
            Don&apos;t have an enrolled profile yet?{" "}
            <a
              href="#student-registration"
              data-path="student-registration"
              className="font-semibold text-primary hover:text-secondary underline decoration-primary/40 underline-offset-4 transition-colors"
            >
              Register as Student
            </a>
          </p>
          <p
            id="instructor-registration"
            className="font-caption text-caption text-on-surface-variant"
          >
            Applying to teach?{" "}
            <a
              href="#instructor-registration"
              data-path="instructor-registration"
              className="text-tertiary hover:text-tertiary-container font-semibold transition-colors"
            >
              Apply as Instructor
            </a>
          </p>
        </div>
      </div>

      {/* Trust Indicators Below Card */}
      <div className="flex flex-wrap items-center justify-center gap-x-space-lg gap-y-2 mt-space-lg text-on-surface-variant">
        {LOGIN_TRUST_INDICATORS.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="hidden sm:inline-block w-1 h-1 rounded-full bg-outline-variant"
              />
            )}
            <div className="flex items-center gap-1.5">
              {renderTrustIcon(item.icon, item.iconColorClass)}
              <span className="font-caption text-caption font-semibold tracking-wide">
                {item.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Quick Help Pill */}
      <div className="mt-space-md">
        <Link
          href="/#footer-contact"
          data-path="contact"
          className="inline-flex items-center gap-1 font-caption text-caption text-on-surface-variant hover:text-on-surface transition-colors py-1 px-3 rounded-full bg-surface-container-low hover:bg-surface-container"
        >
          <HelpCircle className="w-[15px] h-[15px]" aria-hidden="true" />
          <span>Having trouble logging in? Reach Support desk</span>
        </Link>
      </div>
    </div>
  );
}
