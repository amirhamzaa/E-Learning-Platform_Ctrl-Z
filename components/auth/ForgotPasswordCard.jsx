"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Info,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STUDENT_ID_PATTERN = /^SS-\d{4,8}$/i;

function validateIdentifier(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Registered email address or Student ID is required.";
  }
  if (trimmed.includes("@")) {
    if (!EMAIL_PATTERN.test(trimmed)) {
      return "Please enter a valid email address (e.g. name@shikhbeshobai.com).";
    }
    return "";
  }
  if (!STUDENT_ID_PATTERN.test(trimmed)) {
    return "Enter a valid email address or Student ID (e.g. SS-84920).";
  }
  return "";
}

export function ForgotPasswordCard() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusNotice(null);

    const validationError = validateIdentifier(identifier);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Client-side loading visual feedback only; no backend OTP dispatch or redirect.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setStatusNotice(
      "OTP recovery backend is not connected yet. Your identifier passed client-side validation and is ready for future API integration."
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-lg md:p-space-xl flex flex-col relative">
      {/* Circular Recovery Icon Emblem */}
      <div className="flex items-center justify-center mb-space-md">
        <div className="relative w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full -rotate-45"
            viewBox="0 0 80 80"
          >
            <circle
              className="text-secondary-fixed"
              cx="40"
              cy="40"
              fill="none"
              r="36"
              stroke="currentColor"
              strokeDasharray="6 4"
              strokeWidth="2"
            />
          </svg>
          <div className="w-14 h-14 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-primary-container shadow-sm">
            <LockKeyhole className="w-[30px] h-[30px]" aria-hidden="true" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="text-center mb-space-lg">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-semibold">
          Forgot Your Password?
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
          No worries! Enter your registered email address or Student ID below,
          and we&apos;ll send you a 6-digit OTP verification code to reset your
          account password.
        </p>
      </div>

      {/* Recovery Form */}
      <form
        id="forgot-password-form"
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-space-md"
      >
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="identifier-input"
            className="font-label-md text-label-md text-on-surface flex items-center justify-between gap-2"
          >
            <span>Registered Email or Student ID</span>
            <span className="text-on-surface-variant font-caption text-caption shrink-0">
              Required
            </span>
          </label>
          <div className="relative flex items-center">
            <Mail
              aria-hidden="true"
              className="w-5 h-5 absolute left-3.5 text-outline pointer-events-none"
            />
            <input
              id="identifier-input"
              name="identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                if (error) setError("");
                if (statusNotice) setStatusNotice(null);
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "identifier-input-error" : undefined}
              placeholder="name@shikhbeshobai.com or SS-84920"
              required
              className={`w-full pl-11 pr-4 py-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-low transition-all shadow-sm ${
                error
                  ? "ring-2 ring-error/40"
                  : "border border-brand-border/60 focus:border-primary-container/50"
              }`}
            />
          </div>
          {error && (
            <p
              id="identifier-input-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Recovery Tip Callout */}
        <div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
          <Info
            aria-hidden="true"
            className="w-5 h-5 text-primary-container shrink-0 mt-0.5"
          />
          <p className="font-caption text-caption text-on-surface-variant leading-relaxed">
            Make sure you have access to this email or linked Bangladeshi mobile
            number{" "}
            <span className="font-semibold text-on-surface">
              (+880 17XX-XXXXXX)
            </span>{" "}
            for instant SMS recovery.
          </p>
        </div>

        {/* Primary Submit Button */}
        <button
          id="submit-btn"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`w-full py-3.5 px-space-md rounded-xl bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all duration-200 flex items-center justify-center gap-space-xs shadow-md group mt-1 ${
            isSubmitting ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Validating Request...</span>
            </>
          ) : (
            <>
              <span>Send Verification Code</span>
              <ArrowRight
                className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </>
          )}
        </button>

        {/* Honest Frontend-Only Integration Status Notice */}
        {statusNotice && (
          <div
            role="status"
            aria-live="polite"
            className="p-space-sm rounded-lg bg-secondary-fixed/50 text-on-secondary-fixed font-body-sm text-body-sm flex items-start gap-space-sm"
          >
            <Info
              className="w-5 h-5 text-primary shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{statusNotice}</span>
          </div>
        )}
      </form>

      {/* Back to Login & Assistance Footer */}
      <div className="mt-space-lg flex flex-col items-center gap-space-md pt-space-md text-center">
        <Link
          href="/login"
          data-path="student-login"
          className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary-container hover:text-primary transition-colors py-1 px-3 rounded-lg hover:bg-surface-container-low"
        >
          <ArrowLeft className="w-[18px] h-[18px]" aria-hidden="true" />
          <span>Back to Student Login</span>
        </Link>

        <div className="w-full flex items-center gap-space-sm px-4">
          <div className="h-px bg-surface-container-high flex-1" />
          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
            Assistance
          </span>
          <div className="h-px bg-surface-container-high flex-1" />
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Having trouble receiving emails?{" "}
          <Link
            href="/#footer-contact"
            data-path="contact"
            className="font-label-md text-label-md text-primary-container font-semibold hover:underline block md:inline mt-1 md:mt-0"
          >
            Contact 24/7 Student Helpdesk
          </Link>
        </p>
      </div>
    </div>
  );
}
