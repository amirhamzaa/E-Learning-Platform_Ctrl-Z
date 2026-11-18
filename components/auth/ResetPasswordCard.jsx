"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Info,
  KeyRound,
  Loader2,
  LockKeyhole,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

const SPECIAL_CHAR_PATTERN = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

function evaluatePasswordRules(password) {
  const hasLength = password.length >= 8;
  const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = SPECIAL_CHAR_PATTERN.test(password);

  let score = 0;
  if (hasLength) score += 1;
  if (hasCase) score += 1;
  if (hasDigit) score += 1;
  if (hasSpecial) score += 1;
  if (password.length >= 12) score += 1;

  let strength;
  if (password.length === 0) {
    strength = {
      label: "Strength: Weak",
      labelClass: "text-on-surface-variant font-normal",
      barClass: "bg-error w-1/12",
    };
  } else if (score <= 2) {
    strength = {
      label: "Strength: Weak",
      labelClass: "text-error font-medium",
      barClass: "bg-error w-1/4",
    };
  } else if (score === 3 || score === 4) {
    strength = {
      label: "Strength: Moderate",
      labelClass: "text-secondary font-medium",
      barClass: "bg-secondary w-2/3",
    };
  } else {
    strength = {
      label: "Strength: Strong",
      labelClass: "text-tertiary font-semibold",
      barClass: "bg-tertiary-container w-full",
    };
  }

  return {
    criteria: [
      {
        id: "req-length",
        label: "Minimum 8 characters (12+ recommended)",
        met: hasLength,
      },
      {
        id: "req-case",
        label: "At least one uppercase & one lowercase letter",
        met: hasCase,
      },
      {
        id: "req-digit",
        label: "At least one numerical digit (0–9)",
        met: hasDigit,
      },
      {
        id: "req-special",
        label: "At least one special symbol (!@#$%^&*)",
        met: hasSpecial,
      },
    ],
    allMet: hasLength && hasCase && hasDigit && hasSpecial,
    strength,
  };
}

export function ResetPasswordCard() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  const evaluation = useMemo(
    () => evaluatePasswordRules(newPassword),
    [newPassword]
  );

  const liveMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusNotice(null);

    const nextErrors = {};
    if (!newPassword) {
      nextErrors.newPassword = "New password is required.";
    } else if (!evaluation.allMet) {
      nextErrors.newPassword =
        "Please satisfy all 4 password requirements below.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your new password.";
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Client-side loading visual feedback only; no backend password update or redirect.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setStatusNotice(
      "Password reset backend is not connected yet. Your new password passed all client-side security requirements and is ready for future API integration."
    );
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-[0px_10px_35px_-4px_rgba(107,66,38,0.06)] p-space-lg sm:p-space-xl transition-all duration-300 relative">
      {/* Header Ribbon Meta */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-fixed/40 text-on-secondary-fixed font-label-sm text-label-sm tracking-wide uppercase font-semibold mb-space-sm">
          <LockKeyhole
            aria-hidden="true"
            className="w-[15px] h-[15px] text-primary shrink-0"
          />
          <span>Account Recovery</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold tracking-tight mt-space-xs">
          Set New Password
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-sm">
          Create a strong, new password for your Shikhbe Shobai learner vault.
          Your new password must be different from previous passwords.
        </p>
      </div>

      {/* Form Elements */}
      <form
        id="reset-password-form"
        noValidate
        onSubmit={handleSubmit}
        className="mt-space-lg flex flex-col gap-space-md"
      >
        {/* New Password Input Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="new-password"
            className="font-label-md text-label-md text-on-surface font-medium flex items-center justify-between gap-2"
          >
            <span>New Password</span>
            <span
              id="strength-label"
              className={`font-label-sm text-label-sm ${evaluation.strength.labelClass}`}
            >
              {evaluation.strength.label}
            </span>
          </label>
          <div className="relative flex items-center">
            <KeyRound
              aria-hidden="true"
              className="w-5 h-5 absolute left-3.5 text-on-surface-variant pointer-events-none"
            />
            <input
              id="new-password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                if (errors.newPassword) {
                  setErrors((prev) => ({ ...prev, newPassword: undefined }));
                }
                if (statusNotice) setStatusNotice(null);
              }}
              aria-invalid={Boolean(errors.newPassword)}
              aria-describedby={
                errors.newPassword ? "new-password-error" : "strength-label"
              }
              placeholder="Enter new password"
              required
              className={`w-full pl-11 pr-11 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm placeholder:text-on-surface-variant/70 focus:outline-none transition-all duration-200 ${
                errors.newPassword
                  ? "ring-2 ring-error/40"
                  : "border border-brand-border/60 focus:ring-2 focus:ring-primary-container/20"
              }`}
            />
            <button
              id="toggle-new-password"
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
              aria-pressed={showNewPassword}
              className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors focus:outline-none"
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Eye className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Dynamic Strength Bar */}
          <div
            aria-hidden="true"
            className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1"
          >
            <div
              id="strength-meter-bar"
              className={`h-full transition-all duration-300 ${evaluation.strength.barClass}`}
            />
          </div>

          {errors.newPassword && (
            <p
              id="new-password-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.newPassword}</span>
            </p>
          )}
        </div>

        {/* Confirm Password Input Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm-password"
            className="font-label-md text-label-md text-on-surface font-medium"
          >
            Confirm New Password
          </label>
          <div className="relative flex items-center">
            <ShieldCheck
              aria-hidden="true"
              className="w-5 h-5 absolute left-3.5 text-on-surface-variant pointer-events-none"
            />
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (errors.confirmPassword) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }
                if (statusNotice) setStatusNotice(null);
              }}
              aria-invalid={Boolean(errors.confirmPassword || liveMismatch)}
              aria-describedby={
                errors.confirmPassword || liveMismatch
                  ? "match-error-message"
                  : undefined
              }
              placeholder="Re-enter new password"
              required
              className={`w-full pl-11 pr-11 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm placeholder:text-on-surface-variant/70 focus:outline-none transition-all duration-200 ${
                errors.confirmPassword || liveMismatch
                  ? "ring-2 ring-error/40"
                  : "border border-brand-border/60 focus:ring-2 focus:ring-primary-container/20"
              }`}
            />
            <button
              id="toggle-confirm-password"
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showConfirmPassword}
              className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Eye className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {(liveMismatch || errors.confirmPassword) && (
            <p
              id="match-error-message"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1 mt-0.5"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>
                {errors.confirmPassword || "Passwords do not match"}
              </span>
            </p>
          )}
        </div>

        {/* Interactive Password Criteria Verification Matrix */}
        <div className="bg-surface-container-low rounded-xl p-space-md mt-1">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
            Password Requirements
          </p>
          <ul className="flex flex-col gap-2 font-body-sm text-body-sm">
            {evaluation.criteria.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className={`flex items-center gap-2 transition-colors duration-200 ${
                  item.met ? "text-tertiary" : "text-on-surface-variant"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    item.met
                      ? "bg-tertiary-fixed text-on-tertiary-fixed shadow-sm"
                      : "bg-surface-container-high text-on-surface-variant text-[12px] font-bold"
                  }`}
                >
                  {item.met ? (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  ) : (
                    "○"
                  )}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Session Logout Disclaimer Badge */}
        <div className="flex items-start gap-2.5 p-space-sm bg-surface-container rounded-lg text-on-surface-variant mt-1">
          <Shield
            aria-hidden="true"
            className="w-[18px] h-[18px] text-secondary mt-0.5 shrink-0"
          />
          <p className="font-caption text-caption leading-relaxed">
            All active sessions on other devices will be logged out upon update.
          </p>
        </div>

        {/* Primary Action Execution */}
        <button
          id="submit-btn"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`w-full mt-2 py-3.5 px-space-md rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-semibold tracking-wide hover:bg-primary transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 group ${
            isSubmitting ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Validating Password...</span>
            </>
          ) : (
            <>
              <span>Update Password &amp; Sign In</span>
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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

      {/* Secondary Return Action */}
      <div className="mt-space-lg text-center">
        <Link
          href="/login"
          data-path="student-login"
          className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary-container transition-colors py-1 px-space-xs rounded font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Cancel &amp; Return to Login</span>
        </Link>
      </div>
    </div>
  );
}
