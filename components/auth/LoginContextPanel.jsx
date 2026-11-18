import { MessagesSquare, ShieldCheck, Video } from "lucide-react";
import { LOGIN_FEATURE_HIGHLIGHTS, LOGIN_TESTIMONIAL } from "@/data/auth";

function renderFeatureIcon(icon) {
  const iconClass = "w-[22px] h-[22px]";
  switch (icon) {
    case "video":
      return <Video className={iconClass} aria-hidden="true" />;
    case "shield":
      return <ShieldCheck className={iconClass} aria-hidden="true" />;
    case "forum":
      return <MessagesSquare className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function LoginContextPanel() {
  return (
    <div className="hidden lg:flex lg:col-span-5 flex-col justify-between py-space-md pr-space-md">
      <div className="flex flex-col gap-space-md">
        {/* Brand Badge / System Note */}
        <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-xs rounded-full bg-tertiary/10 text-tertiary">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-tertiary animate-pulse"
          />
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            Bengali Tech Excellence
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
            Student Portal
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Your gateway to mastery &amp; mentorship.
          </h2>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          Return to continuous learning alongside over 60,000+ graduates
          transforming global freelancing, software engineering, and creative
          industries.
        </p>
      </div>

      {/* Feature Highlight Cards */}
      <div className="flex flex-col gap-space-sm mt-space-xl">
        {LOGIN_FEATURE_HIGHLIGHTS.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center ${feature.iconColorClass} shadow-sm flex-shrink-0`}
            >
              {renderFeatureIcon(feature.icon)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md text-on-surface">
                {feature.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {feature.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Micro-Snippet */}
      <div className="mt-space-lg p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-title-md text-on-secondary-fixed font-bold shrink-0">
          {LOGIN_TESTIMONIAL.initials}
        </div>
        <div className="flex flex-col">
          <p className="font-caption text-caption text-on-surface-variant italic">
            {LOGIN_TESTIMONIAL.quote}
          </p>
          <span className="font-label-sm text-label-sm text-primary font-semibold">
            {LOGIN_TESTIMONIAL.author}
          </span>
        </div>
      </div>
    </div>
  );
}
