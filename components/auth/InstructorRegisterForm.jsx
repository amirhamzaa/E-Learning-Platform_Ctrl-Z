"use client";

import {
  AlertCircle,
  ArrowRight,
  AtSign,
  Briefcase,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  IdCard,
  Info,
  Link2,
  Loader2,
  Lock,
  LockKeyhole,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  EXPERIENCE_RANGE_OPTIONS,
  TEACHING_TRACK_OPTIONS,
} from "@/data/instructorRegister";

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

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateInstructorForm(values) {
  const errors = {};
  const trimmedName = values.legalName.trim();
  const trimmedEmail = values.workEmail.trim();
  const normalizedPhone = normalizeBdPhone(values.phoneContact);
  const trimmedHeadline = values.proHeadline.trim();
  const trimmedUrl = values.portfolioUrl.trim();

  if (!trimmedName) {
    errors.legalName = "Full legal name is required.";
  } else if (trimmedName.length < 2) {
    errors.legalName = "Please enter your full legal name.";
  }

  if (!trimmedEmail) {
    errors.workEmail = "Professional email address is required.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.workEmail =
      "Please enter a valid email address (e.g. tanvir@company.com).";
  }

  if (!values.phoneContact.trim()) {
    errors.phoneContact = "Bangladesh phone number is required.";
  } else if (!BD_MOBILE_PATTERN.test(normalizedPhone)) {
    errors.phoneContact =
      "Enter a valid 10-digit Bangladesh mobile number after +880 (e.g. 1700-000000).";
  }

  if (!trimmedHeadline) {
    errors.proHeadline = "Professional headline is required.";
  } else if (trimmedHeadline.length < 5) {
    errors.proHeadline = "Please provide a brief professional headline.";
  }

  if (!values.trackSelect) {
    errors.trackSelect = "Please select your primary teaching track.";
  }

  if (!values.expSelect) {
    errors.expSelect = "Please select your industry experience range.";
  }

  if (!trimmedUrl) {
    errors.portfolioUrl =
      "Portfolio, GitHub, or LinkedIn profile URL is required.";
  } else if (!isValidHttpUrl(trimmedUrl)) {
    errors.portfolioUrl =
      "Enter a valid URL starting with https:// or http://.";
  }

  if (!values.passwordField) {
    errors.passwordField = "Password is required.";
  } else if (values.passwordField.length < 8) {
    errors.passwordField = "Password must be at least 8 characters.";
  }

  if (!values.confirmPasswordField) {
    errors.confirmPasswordField = "Please confirm your password.";
  } else if (values.confirmPasswordField !== values.passwordField) {
    errors.confirmPasswordField = "Passwords do not match.";
  }

  if (!values.facultyTerms) {
    errors.facultyTerms =
      "You must agree to the Shikhbe Shobai Faculty Guidelines and Honor Code.";
  }

  return errors;
}

export function InstructorRegisterForm() {
  const [formValues, setFormValues] = useState({
    legalName: "",
    workEmail: "",
    phoneContact: "",
    proHeadline: "",
    trackSelect: "",
    expSelect: "",
    portfolioUrl: "",
    passwordField: "",
    confirmPasswordField: "",
    facultyTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  const handleFieldChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (statusNotice) setStatusNotice(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusNotice(null);

    const validationErrors = validateInstructorForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Client-side loading visual feedback only; no backend submission or redirect.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setStatusNotice(
      "Instructor application backend is not connected yet. All fields passed client-side validation and are ready for future API integration."
    );
  };

  const getInputClass = (field, extraPadding = "pl-11 pr-space-md") =>
    `w-full ${extraPadding} py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest transition-all ${
      errors[field]
        ? "ring-2 ring-error/40"
        : "focus:ring-2 focus:ring-primary-container/20"
    }`;

  return (
    <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-xl shadow-md p-space-md sm:p-space-lg md:p-space-xl">
      <form
        id="instructorApplicationForm"
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-space-xl"
      >
        {/* SECTION 1: Professional Identity */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between gap-2 pb-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shrink-0">
                1
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Professional Identity
              </h3>
            </div>
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider shrink-0">
              Step 01 / 03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Full Legal Name */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="legalName"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Full Legal Name
              </label>
              <div className="relative">
                <IdCard
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  id="legalName"
                  name="legalName"
                  type="text"
                  autoComplete="name"
                  value={formValues.legalName}
                  onChange={(event) =>
                    handleFieldChange("legalName", event.target.value)
                  }
                  aria-invalid={Boolean(errors.legalName)}
                  aria-describedby={
                    errors.legalName ? "legalName-error" : undefined
                  }
                  placeholder="e.g. Tanvir Ahmed"
                  required
                  className={getInputClass("legalName")}
                />
              </div>
              {errors.legalName && (
                <p
                  id="legalName-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.legalName}</span>
                </p>
              )}
            </div>

            {/* Professional Email */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="workEmail"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Professional Email Address
              </label>
              <div className="relative">
                <AtSign
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  autoComplete="email"
                  value={formValues.workEmail}
                  onChange={(event) =>
                    handleFieldChange("workEmail", event.target.value)
                  }
                  aria-invalid={Boolean(errors.workEmail)}
                  aria-describedby={
                    errors.workEmail ? "workEmail-error" : undefined
                  }
                  placeholder="tanvir@company.com or gmail.com"
                  required
                  className={getInputClass("workEmail")}
                />
              </div>
              {errors.workEmail && (
                <p
                  id="workEmail-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.workEmail}</span>
                </p>
              )}
            </div>

            {/* Phone Number (+880) */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="phoneContact"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Phone Number (Bangladesh)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    +880
                  </span>
                </div>
                <input
                  id="phoneContact"
                  name="phoneContact"
                  type="tel"
                  autoComplete="tel-national"
                  value={formValues.phoneContact}
                  onChange={(event) =>
                    handleFieldChange("phoneContact", event.target.value)
                  }
                  aria-invalid={Boolean(errors.phoneContact)}
                  aria-describedby={
                    errors.phoneContact ? "phoneContact-error" : undefined
                  }
                  placeholder="1700-000000"
                  required
                  className={getInputClass(
                    "phoneContact",
                    "pl-16 pr-space-md"
                  )}
                />
              </div>
              {errors.phoneContact && (
                <p
                  id="phoneContact-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.phoneContact}</span>
                </p>
              )}
            </div>

            {/* Professional Headline */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="proHeadline"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Professional Headline
              </label>
              <div className="relative">
                <Briefcase
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  id="proHeadline"
                  name="proHeadline"
                  type="text"
                  value={formValues.proHeadline}
                  onChange={(event) =>
                    handleFieldChange("proHeadline", event.target.value)
                  }
                  aria-invalid={Boolean(errors.proHeadline)}
                  aria-describedby={
                    errors.proHeadline ? "proHeadline-error" : undefined
                  }
                  placeholder="Lead Software Architect at Shohoz • 8+ Yrs"
                  required
                  className={getInputClass("proHeadline")}
                />
              </div>
              {errors.proHeadline && (
                <p
                  id="proHeadline-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.proHeadline}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Expertise & Track */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between gap-2 pb-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shrink-0">
                2
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Expertise &amp; Track
              </h3>
            </div>
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider shrink-0">
              Step 02 / 03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Teaching Track Dropdown */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="trackSelect"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Primary Teaching Track
              </label>
              <div className="relative">
                <GraduationCap
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <select
                  id="trackSelect"
                  name="trackSelect"
                  value={formValues.trackSelect}
                  onChange={(event) =>
                    handleFieldChange("trackSelect", event.target.value)
                  }
                  aria-invalid={Boolean(errors.trackSelect)}
                  aria-describedby={
                    errors.trackSelect ? "trackSelect-error" : undefined
                  }
                  required
                  className={`${getInputClass(
                    "trackSelect",
                    "pl-11 pr-10"
                  )} appearance-none ${
                    !formValues.trackSelect ? "text-on-surface-variant" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select Primary Discipline
                  </option>
                  {TEACHING_TRACK_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
              </div>
              {errors.trackSelect && (
                <p
                  id="trackSelect-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.trackSelect}</span>
                </p>
              )}
            </div>

            {/* Years of Industry Experience Dropdown */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="expSelect"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Years of Industry Experience
              </label>
              <div className="relative">
                <TrendingUp
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <select
                  id="expSelect"
                  name="expSelect"
                  value={formValues.expSelect}
                  onChange={(event) =>
                    handleFieldChange("expSelect", event.target.value)
                  }
                  aria-invalid={Boolean(errors.expSelect)}
                  aria-describedby={
                    errors.expSelect ? "expSelect-error" : undefined
                  }
                  required
                  className={`${getInputClass(
                    "expSelect",
                    "pl-11 pr-10"
                  )} appearance-none ${
                    !formValues.expSelect ? "text-on-surface-variant" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select Experience Range
                  </option>
                  {EXPERIENCE_RANGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
              </div>
              {errors.expSelect && (
                <p
                  id="expSelect-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.expSelect}</span>
                </p>
              )}
            </div>

            {/* Portfolio / GitHub / LinkedIn URL */}
            <div className="md:col-span-2 flex flex-col gap-space-xs">
              <label
                htmlFor="portfolioUrl"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Portfolio, GitHub, or LinkedIn Profile URL
              </label>
              <div className="relative">
                <Link2
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  autoComplete="url"
                  value={formValues.portfolioUrl}
                  onChange={(event) =>
                    handleFieldChange("portfolioUrl", event.target.value)
                  }
                  aria-invalid={Boolean(errors.portfolioUrl)}
                  aria-describedby={
                    errors.portfolioUrl ? "portfolioUrl-error" : undefined
                  }
                  placeholder="https://github.com/yourhandle or https://linkedin.com/in/yourprofile"
                  required
                  className={getInputClass("portfolioUrl")}
                />
              </div>
              {errors.portfolioUrl && (
                <p
                  id="portfolioUrl-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.portfolioUrl}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Account Security */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between gap-2 pb-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shrink-0">
                3
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Account Security
              </h3>
            </div>
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider shrink-0">
              Step 03 / 03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Password Field */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="passwordField"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Create Secure Password
              </label>
              <div className="relative">
                <Lock
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  id="passwordField"
                  name="passwordField"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={8}
                  value={formValues.passwordField}
                  onChange={(event) =>
                    handleFieldChange("passwordField", event.target.value)
                  }
                  aria-invalid={Boolean(errors.passwordField)}
                  aria-describedby={
                    errors.passwordField ? "passwordField-error" : undefined
                  }
                  placeholder="Min 8 characters"
                  required
                  className={getInputClass("passwordField", "pl-11 pr-11")}
                />
                <button
                  id="togglePassword1"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.passwordField && (
                <p
                  id="passwordField-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.passwordField}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="confirmPasswordField"
                className="font-label-md text-label-md text-on-surface font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  id="confirmPasswordField"
                  name="confirmPasswordField"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={8}
                  value={formValues.confirmPasswordField}
                  onChange={(event) =>
                    handleFieldChange(
                      "confirmPasswordField",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(errors.confirmPasswordField)}
                  aria-describedby={
                    errors.confirmPasswordField
                      ? "confirmPasswordField-error"
                      : undefined
                  }
                  placeholder="Re-enter password"
                  required
                  className={getInputClass(
                    "confirmPasswordField",
                    "pl-11 pr-11"
                  )}
                />
                <button
                  id="togglePassword2"
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.confirmPasswordField && (
                <p
                  id="confirmPasswordField-error"
                  role="alert"
                  className="font-caption text-caption text-error flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errors.confirmPasswordField}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Honor Code & Verification Checkbox */}
        <div className="pt-space-xs space-y-1">
          <label
            htmlFor="facultyTerms"
            className="flex items-start gap-space-sm cursor-pointer select-none group"
          >
            <input
              id="facultyTerms"
              name="facultyTerms"
              type="checkbox"
              checked={formValues.facultyTerms}
              onChange={(event) =>
                handleFieldChange("facultyTerms", event.target.checked)
              }
              aria-invalid={Boolean(errors.facultyTerms)}
              aria-describedby={
                errors.facultyTerms ? "facultyTerms-error" : undefined
              }
              required
              className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container border-outline/30 focus:ring-primary-container/20 shrink-0 cursor-pointer"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
              I confirm the accuracy of my credentials and agree to Shikhbe
              Shobai Faculty Guidelines and Honor Code.
            </span>
          </label>
          {errors.facultyTerms && (
            <p
              id="facultyTerms-error"
              role="alert"
              className="font-caption text-caption text-error flex items-center gap-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.facultyTerms}</span>
            </p>
          )}
        </div>

        {/* Primary Submission Action Button */}
        <div className="flex flex-col gap-space-xs pt-space-xs">
          <button
            id="submitAppBtn"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`w-full bg-primary-container text-on-primary py-3.5 px-8 rounded-xl font-semibold shadow-sm hover:bg-primary transition-all duration-200 flex items-center justify-center gap-space-sm focus:ring-4 focus:ring-primary-container/20 ${
              isSubmitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="w-5 h-5 animate-spin text-on-primary"
                  aria-hidden="true"
                />
                <span className="font-title-md text-title-md text-on-primary">
                  Validating Application...
                </span>
              </>
            ) : (
              <>
                <span className="font-title-md text-title-md text-on-primary">
                  Submit Instructor Application
                </span>
                <ArrowRight
                  className="w-5 h-5 text-on-primary"
                  aria-hidden="true"
                />
              </>
            )}
          </button>

          {statusNotice && (
            <div
              role="status"
              aria-live="polite"
              className="mt-space-sm p-space-sm rounded-lg bg-secondary-fixed/50 text-on-secondary-fixed font-body-sm text-body-sm flex items-start gap-space-sm"
            >
              <Info
                className="w-5 h-5 text-primary shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{statusNotice}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
