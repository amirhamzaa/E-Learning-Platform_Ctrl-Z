"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface"
    >
      <Container>
        <div className="relative rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-space-lg lg:p-space-xl overflow-hidden shadow-xl text-on-primary">
          {/* Subtle background pattern decorative ring */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-bold">
                Stay Ahead of the Curve
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg font-bold">
                Get Free Weekly Career Roadmaps &amp; Early Batch Invites
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
                Subscribe to Shikhbe Shobai’s curated Saturday Digest. We
                deliver exclusive industry playbooks, scholarship opportunities,
                and free workshop invites straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-xs">
              <form
                id="newsletter-form"
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  aria-label="Personal email address"
                  aria-invalid={status === "error"}
                  placeholder="Enter your personal email address"
                  required
                  className="px-space-md py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed flex-1 shadow-sm"
                />
                <button
                  type="submit"
                  className="px-space-lg py-3 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim font-title-md text-title-md font-semibold transition-all shadow-md shrink-0"
                >
                  Subscribe Free
                </button>
              </form>

              {status === "error" && (
                <p
                  role="alert"
                  className="font-caption text-caption text-error-container mt-1 flex items-center gap-1"
                >
                  <AlertCircle
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{errorMessage}</span>
                </p>
              )}

              {status === "success" && (
                <p
                  id="newsletter-success"
                  role="status"
                  className="font-caption text-caption text-tertiary-fixed mt-1 flex items-center gap-1"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Welcome! Please check your inbox to confirm your
                    subscription.
                  </span>
                </p>
              )}

              <span className="font-caption text-caption text-surface-container-highest/80">
                No spam, unsubscribe with one click at any time.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
