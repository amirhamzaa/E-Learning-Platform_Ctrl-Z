"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  LockKeyhole,
  Mail,
  ShieldCheck,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BD_MOBILE_PATTERN = /^1[3-9]\d{8}$/;

function normalizeBdPhone(rawPhone) {
  const digitsOnly = rawPhone.replace(/\D/g, "");
  if (digitsOnly.startsWith("880") && digitsOnly.length === 13) {
    return digitsOnly.slice(3);
  }
  if (digitsOnly.startsWith("0") && digitsOnly.length === 11) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

function evaluatePasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      barColorClass: "bg-surface-container-high",
      textColorClass: "text-on-surface-variant",
      label: "12+ chars, symbol, number recommended",
    };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return {
      score: 1,
      barColorClass: "bg-error",
      textColorClass: "text-error",
      label: "Weak - add 12+ chars, number, symbol",
    };
  }

  if (score === 2) {
    return {
      score: 2,
      barColorClass: "bg-secondary",
      textColorClass: "text-secondary",
      label: "Fair - include a number & symbol",
    };
  }

  if (score === 3) {
    return {
      score: 3,
      barColorClass: "bg-tertiary-container",
      textColorClass: "text-tertiary",
      label: "Good - almost strong (12+ chars)",
    };
  }

  return {
    score: 4,
    barColorClass: "bg-tertiary",
    textColorClass: "text-tertiary",
    label: "Strong - 12+ chars, symbol, number",
  };
}

function validateRegistrationForm(values) {
  const errors = {};
  const trimmedName = values.fullName.trim();
  const trimmedEmail = values.email.trim();
  const normalizedPhone = normalizeBdPhone(values.phone);

  if (!trimmedName) {
    errors.fullName = "Full legal name is required.";
  } else if (trimmedName.length < 2) {
    errors.fullName = "Please enter your full legal name.";
  }

  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address (e.g. ariful@gmail.com).";
  }

  if (!values.phone.trim()) {
    errors.phone = "Bangladesh mobile number is required.";
  } else if (!BD_MOBILE_PATTERN.test(normalizedPhone)) {
    errors.phone =
      "Enter a valid 10-digit Bangladesh mobile number after +880 (e.g. 1712-345678).";
  }

  if (!values.password) {
    errors.password = "Secure password is required.";
  } else if (values.password.length < 12) {
    errors.password = "Password must be at least 12 characters long.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.termsConsent) {
    errors.termsConsent =
      "You must agree to the Terms & Conditions, Privacy Policy, and Student Code of Conduct.";
  }

  return errors;
}

export function RegisterFormCard() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsConsent, setTermsConsent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  const passwordStrength = useMemo(
    () => evaluatePasswordStrength(password),
    [password]
  );

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (statusNotice) setStatusNotice(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusNotice(null);

    const validationErrors = validateRegistrationForm({
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      termsConsent,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Client-side loading visual feedback only; no backend registration or API call.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setStatusNotice(
      "Registration backend is not connected yet. All fields passed client-side validation and are ready for future API integration."
    );
  };

  const handleSocialClick = (provider) => {
    setErrors({});
    setStatusNotice(
      `${provider} registration is not connected yet and will be enabled once backend OAuth integration is added.`
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-xl relative">
      {/* SSO Quick Provisioning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mb-space-md">
        <button
          type="button"
          onClick={() => handleSocialClick("Google")}
          className="group flex items-center justify-center gap-space-sm py-3 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all duration-200"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
          >
            <path
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              fill="#4285F4"
            />
            <path
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.31 7.31 24 12 24z"
              fill="#34A853"
            />
            <path
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-label-md text-label-md text-on-surface group-hover:text-primary-container transition-colors">
            Continue with Google
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialClick("GitHub")}
          className="group flex items-center justify-center gap-space-sm py-3 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all duration-200"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 flex-shrink-0 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              fillRule="evenodd"
            />
          </svg>
          <span className="font-label-md text-label-md text-on-surface group-hover:text-primary-container transition-colors">
            Continue with GitHub
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-space-md">
        <div className="w-full h-px bg-surface-container-high" />
        <span className="absolute bg-surface-container-lowest px-space-sm font-caption text-caption text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
          Or register with academic credentials
        </span>
      </div>

      {/* Academic Enrollment Form */}
      <form noValidate onSubmit={handleSubmit} className="space-y-space-md">
        {/* Full Name */}
        <div className="space-y-1">
          <label
            htmlFor="fullName"
            className="block font-label-md text-label-md text-on-surface"
          >
            Full Legal Name
          </label>
          <div className="relative">
            <User
              aria-hidden="true"
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
            />
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                clearFieldError("fullName");
              }}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              placeholder="e.g. Ariful Islam"
              required
              className={`w-full pl-10 pr-space-md py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-low transition-all shadow-sm ${
                errors.fullName
                  ? "ring-2 ring-error/40"
                  : "border border-brand-border/60 focus:border-primary-container/50"
              }`}
            />
          </div>
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block font-label-md text-label-md text-on-surface"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="e.g. ariful@gmail.com"
              required
              className={`w-full pl-10 pr-space-md py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-low transition-all shadow-sm ${
                errors.email
                  ? "ring-2 ring-error/40"
                  : "border border-brand-border/60 focus:border-primary-container/50"
              }`}
            />
          </div>
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Number with BD Prefix Badge */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <label
              htmlFor="phone"
              className="font-label-md text-label-md text-on-surface"
            >
              Bangladesh Mobile Number
            </label>
            <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
              <ShieldCheck
                aria-hidden="true"
                className="w-3.5 h-3.5 text-tertiary shrink-0"
              />
              <span>BTRC SMS Verified</span>
            </span>
          </div>
          <div
            className={`flex rounded-lg shadow-sm overflow-hidden bg-surface-container-lowest ${
              errors.phone
                ? "ring-2 ring-error/40"
                : "border border-brand-border/60 focus-within:border-primary-container/50"
            }`}
          >
            <div className="flex items-center gap-1.5 px-3 py-3 bg-surface-container-low text-on-surface select-none shrink-0">
              {/* Flag of Bangladesh SVG */}
              <svg
                aria-hidden="true"
                className="w-5 h-3.5 rounded-sm object-cover flex-shrink-0"
                viewBox="0 0 20 12"
              >
                <rect fill="#006a4e" height="12" width="20" />
                <circle cx="9" cy="6" fill="#f42a41" r="4" />
              </svg>
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                +880
              </span>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                clearFieldError("phone");
              }}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="1712-345678"
              required
              className="w-full px-space-md py-3 text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-low transition-all"
            />
          </div>
          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Password Grid with Real-time Strength Feedback */}
        <div className="space-y-space-md">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="password"
                className="font-label-md text-label-md text-on-surface"
              >
                Secure Password
              </label>
              <button
                id="togglePass"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="font-caption text-caption text-primary-container hover:text-primary transition-colors flex items-center gap-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
                <span>{showPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
            <div className="relative">
              <Lock
                aria-hidden="true"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearFieldError("password");
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : "password-strength-label"
                }
                placeholder="At least 12 characters"
                required
                className={`w-full pl-10 pr-space-md py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-low transition-all shadow-sm ${
                  errors.password
                    ? "ring-2 ring-error/40"
                    : "border border-brand-border/60 focus:border-primary-container/50"
                }`}
              />
            </div>

            {errors.password && (
              <p
                id="password-error"
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

            {/* Password Strength Indicator */}
            <div className="pt-1.5 space-y-1.5">
              <div
                aria-hidden="true"
                className="flex gap-1.5 h-1.5 w-full"
              >
                {[1, 2, 3, 4].map((segment) => (
                  <div
                    key={segment}
                    className={`h-full w-1/4 rounded-full transition-all duration-300 ${
                      segment <= passwordStrength.score
                        ? passwordStrength.barColorClass
                        : "bg-surface-container-high"
                    }`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1 font-caption text-caption text-on-surface-variant">
                <span
                  id="password-strength-label"
                  className={`flex items-center gap-1 font-medium ${passwordStrength.textColorClass}`}
                >
                  <SlidersHorizontal
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{passwordStrength.label}</span>
                </span>
                <span className="text-on-surface-variant/70">
                  Encrypted AES-256
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <label
                htmlFor="confirmPassword"
                className="font-label-md text-label-md text-on-surface"
              >
                Confirm Password
              </label>
              {passwordsMatch && (
                <span className="inline-flex items-center gap-1 text-tertiary font-caption text-caption font-medium">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Passwords match</span>
                </span>
              )}
              {passwordsMismatch && (
                <span className="inline-flex items-center gap-1 text-error font-caption text-caption font-medium">
                  <AlertCircle
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Passwords do not match</span>
                </span>
              )}
            </div>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  clearFieldError("confirmPassword");
                }}
                aria-invalid={Boolean(
                  errors.confirmPassword || passwordsMismatch
                )}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                placeholder="Re-enter password"
                required
                className={`w-full pl-10 pr-10 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-low transition-all shadow-sm ${
                  errors.confirmPassword || passwordsMismatch
                    ? "ring-2 ring-error/40"
                    : "border border-brand-border/60 focus:border-primary-container/50"
                }`}
              />
              {passwordsMatch && (
                <Check
                  aria-hidden="true"
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none"
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                role="alert"
                className="font-caption text-caption text-error flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>
        </div>

        {/* Academic Honor Code & Agreement */}
        <div className="pt-2 space-y-1">
          <label
            htmlFor="termsConsent"
            className="flex items-start gap-space-sm cursor-pointer select-none group"
          >
            <span className="relative flex items-center pt-0.5 shrink-0">
              <input
                id="termsConsent"
                name="termsConsent"
                type="checkbox"
                checked={termsConsent}
                onChange={(event) => {
                  setTermsConsent(event.target.checked);
                  clearFieldError("termsConsent");
                }}
                aria-invalid={Boolean(errors.termsConsent)}
                aria-describedby={
                  errors.termsConsent ? "termsConsent-error" : undefined
                }
                className="peer sr-only"
              />
              <span className="w-5 h-5 rounded bg-surface-container-low border border-outline-variant/60 peer-checked:bg-primary-container peer-checked:border-primary-container peer-focus-visible:ring-2 peer-focus-visible:ring-primary-container/30 transition-colors flex items-center justify-center">
                <Check
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 text-on-primary transition-opacity ${
                    termsConsent ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              I agree to Shikhbe Shobai{" "}
              <a
                href="#auth-footer-legal"
                data-path="terms-of-service"
                className="text-primary-container font-semibold hover:underline"
              >
                Terms &amp; Conditions
              </a>
              ,{" "}
              <a
                href="#auth-footer-legal"
                data-path="privacy-policy"
                className="text-primary-container font-semibold hover:underline"
              >
                Privacy Policy
              </a>
              , and the{" "}
              <a
                href="#auth-footer-legal"
                data-path="code-of-conduct"
                className="text-primary-container font-semibold hover:underline"
              >
                Student Code of Conduct
              </a>
              .
            </span>
          </label>
          {errors.termsConsent && (
            <p
              id="termsConsent-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.termsConsent}</span>
            </p>
          )}
        </div>

        {/* Primary Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`w-full py-3.5 px-space-lg rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-semibold hover:bg-primary transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-space-sm group ${
              isSubmitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>Validating Account Details...</span>
              </>
            ) : (
              <>
                <span>Create Student Account</span>
                <ArrowRight
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </div>
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

      {/* Card Footer Navigation */}
      <div className="mt-space-lg pt-space-md bg-surface-container-low/60 -mx-space-md sm:-mx-space-lg -mb-space-md sm:-mb-space-lg p-space-md rounded-b-xl text-center">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Already have an account?{" "}
          <Link
            href="/login"
            data-path="student-login"
            className="font-label-md text-label-md font-semibold text-primary-container hover:text-primary transition-colors underline underline-offset-4 ml-1"
          >
            Sign In to Portal
          </Link>
        </p>
      </div>
    </div>
  );
}
