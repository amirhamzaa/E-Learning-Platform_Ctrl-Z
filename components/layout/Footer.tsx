import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_INSTITUTION_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_PLATFORM_LINKS,
  SITE_ASSETS,
} from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer
      id="footer-contact"
      className="w-full bg-surface-container-low py-space-xl mt-space-xl"
    >
      <Container className="px-gutter-mobile sm:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <Link href="/" aria-label="Shikhbe Shobai Home">
                <Image
                  src={SITE_ASSETS.logo}
                  alt="Shikhbe Shobai Logo"
                  width={160}
                  height={66}
                  className="w-auto object-contain h-11"
                />
              </Link>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              An enlightened, modern educational ecosystem dedicated to lifelong
              learners and professional mentors in Bangladesh and beyond.
            </p>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-title-md text-title-md text-on-surface font-semibold">
              Platform
            </span>
            {FOOTER_PLATFORM_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-path={link.plannedRoute}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-title-md text-title-md text-on-surface font-semibold">
              Institution
            </span>
            {FOOTER_INSTITUTION_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-path={link.plannedRoute}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-title-md text-title-md text-on-surface font-semibold">
              Contact Us
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              House 42, Road 11, Banani, Dhaka, Bangladesh
            </p>
            <a
              href="mailto:support@shikhbeshobai.com"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              support@shikhbeshobai.com
            </a>
            <a
              href="tel:+8801700000000"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              +880 1700-000000
            </a>
          </div>
        </div>

        <div
          id="footer-legal"
          className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-caption text-caption"
        >
          <p>© 2025 Shikhbe Shobai Solutions Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-space-md">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-path={link.plannedRoute}
                className="hover:text-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
