"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  Clock,
  Info,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const OTP_LENGTH = 6;
const INITIAL_EXPIRY_SECONDS = 165; // 02:45
const INITIAL_RESEND_SECONDS = 45;

function formatTimer(totalSeconds) {
  if (totalSeconds <= 0) return "Expired";
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function OtpVerificationCard() {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [expirySeconds, setExpirySeconds] = useState(INITIAL_EXPIRY_SECONDS);
  const [resendSeconds, setResendSeconds] = useState(INITIAL_RESEND_SECONDS);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (expirySeconds <= 0) return undefined;
    const interval = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [expirySeconds]);

  useEffect(() => {
    if (resendSeconds <= 0) return undefined;
    const interval = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendSeconds]);

  const handleDigitChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, "");
    if (error) setError("");
    if (statusNotice) setStatusNotice(null);

    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handle multi-digit paste or fast input
    const chars = cleaned.slice(0, OTP_LENGTH - index).split("");
    const next = [...digits];
    chars.forEach((char, offset) => {
      next[index + offset] = char;
    });
    setDigits(next);

    const nextFocusIndex = Math.min(index + chars.length, OTP_LENGTH - 1);
    setActiveIndex(nextFocusIndex);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (!digits[index] && index > 0) {
        const prevIndex = index - 1;
        const next = [...digits];
        next[prevIndex] = "";
        setDigits(next);
        setActiveIndex(prevIndex);
        inputRefs.current[prevIndex]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    event.preventDefault();

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, idx) => {
      next[idx] = char;
    });
    setDigits(next);
    if (error) setError("");
    if (statusNotice) setStatusNotice(null);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    setActiveIndex(focusIndex);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;
    setExpirySeconds(INITIAL_EXPIRY_SECONDS);
    setResendSeconds(INITIAL_RESEND_SECONDS);
    setError("");
    setStatusNotice(
      "OTP resend backend is not connected yet. Countdown timer has been reset for UI testing."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusNotice(null);

    if (expirySeconds <= 0) {
      setError("This OTP code has expired. Please request a new code.");
      return;
    }

    const firstEmptyIndex = digits.findIndex((d) => !d);
    if (firstEmptyIndex !== -1) {
      setError("Please enter all 6 digits of your verification code.");
      setActiveIndex(firstEmptyIndex);
      inputRefs.current[firstEmptyIndex]?.focus();
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Client-side loading visual feedback only; no backend verification or redirect.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setStatusNotice(
      "OTP verification backend is not connected yet. Your 6-digit code passed client-side validation and is ready for future API integration."
    );
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xl relative overflow-hidden">
      {/* Subtle Academic Decorative Accent Strip */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-container via-secondary to-tertiary-container"
      />

      {/* Typography Heading */}
      <div className="text-center mt-space-xs mb-space-md">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
          Enter 6-Digit OTP Code
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          We have dispatched a 6-digit one-time password to{" "}
          <span className="font-label-md text-on-surface font-semibold break-all">
            ariful.islam@shikhbeshobai.com
          </span>{" "}
          and SMS to{" "}
          <span className="font-label-md text-on-surface font-semibold whitespace-nowrap">
            +880 1712-***678
          </span>
          .
        </p>
      </div>

      {/* Live Countdown Timer Strip */}
      <div className="w-full bg-surface-container-low rounded-lg py-2 px-space-md flex items-center justify-center gap-space-xs mb-space-lg">
        <Clock
          aria-hidden="true"
          className="w-[18px] h-[18px] text-primary-container shrink-0"
        />
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Code expires in:
        </span>
        <span
          id="countdown-timer"
          aria-live="off"
          className={`font-label-sm text-label-sm font-semibold tracking-wider ${
            expirySeconds <= 0 ? "text-error" : "text-primary-container"
          }`}
        >
          {formatTimer(expirySeconds)}
        </span>
      </div>

      {/* OTP 6-Digit Input Grid */}
      <form
        id="otp-form"
        noValidate
        onSubmit={handleSubmit}
        className="space-y-space-lg"
      >
        <div className="space-y-2">
          <div
            role="group"
            aria-label="6-digit one-time password"
            onPaste={handlePaste}
            className="flex items-center justify-between gap-1.5 sm:gap-2.5"
          >
            {digits.map((digit, index) => {
              const isHighlighted = index === activeIndex && !digit;
              return (
                <div
                  key={index}
                  className="relative w-11 h-14 sm:w-12 sm:h-14"
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    aria-label={`OTP digit ${index + 1} of ${OTP_LENGTH}`}
                    aria-invalid={Boolean(error)}
                    placeholder={isHighlighted ? "•" : ""}
                    onFocus={(event) => {
                      setActiveIndex(index);
                      event.target.select();
                    }}
                    onChange={(event) =>
                      handleDigitChange(index, event.target.value)
                    }
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    className={`w-full h-full text-center font-headline-md text-headline-md text-on-surface rounded-lg focus:outline-none shadow-sm transition-all ${
                      error
                        ? "bg-surface-container-lowest ring-2 ring-error/50"
                        : isHighlighted
                          ? "bg-surface-container-lowest ring-2 ring-primary-container placeholder:text-primary-container"
                          : "bg-surface-container-low focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
                    }`}
                  />
                  {isHighlighted && !error && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-container rounded-full animate-ping pointer-events-none"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <p
              role="alert"
              className="font-caption text-caption text-error flex items-center justify-center gap-1 pt-1"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Secondary Micro Actions */}
        <div className="flex flex-col items-center gap-space-xs text-center pt-space-xs">
          <p className="font-body-sm text-body-sm text-on-surface-variant flex flex-wrap items-center justify-center gap-1">
            <span>Didn&apos;t receive code?</span>
            <button
              id="resend-btn"
              type="button"
              disabled={resendSeconds > 0}
              onClick={handleResend}
              className={`font-label-sm text-label-sm text-primary-container font-semibold hover:text-primary transition-colors inline-flex items-center gap-1 ${
                resendSeconds > 0
                  ? "cursor-not-allowed opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <span>Resend Code</span>
              {resendSeconds > 0 && (
                <span
                  id="resend-counter"
                  className="text-caption font-normal text-on-surface-variant"
                >
                  ({resendSeconds}s)
                </span>
              )}
            </button>
          </p>

          <Link
            href="/forgot-password"
            data-path="forgot-password"
            className="font-caption text-caption text-secondary hover:text-primary underline decoration-secondary-container underline-offset-4 transition-colors font-medium inline-flex items-center gap-1 mt-1"
          >
            <ArrowLeftRight
              className="w-3.5 h-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>Change Email Address / Phone</span>
          </Link>
        </div>

        {/* Primary Submit Button */}
        <div className="pt-space-xs">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`w-full py-3.5 px-space-md rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-semibold hover:bg-primary active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-space-sm group ${
              isSubmitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>Validating Code...</span>
              </>
            ) : (
              <>
                <span>Verify &amp; Proceed</span>
                <ArrowRight
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
          className="mt-space-md p-space-sm rounded-lg bg-secondary-fixed/50 text-on-secondary-fixed font-body-sm text-body-sm flex items-start gap-space-sm shadow-sm"
        >
          <Info
            className="w-5 h-5 text-primary shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span>{statusNotice}</span>
        </div>
      )}
    </div>
  );
}
