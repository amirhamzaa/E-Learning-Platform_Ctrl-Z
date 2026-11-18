import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { INSTRUCTOR_ANNOUNCEMENTS } from "@/data/studentDashboard";

export function StudentAnnouncements() {
  return (
    <section
      id="announcements"
      className="flex flex-col gap-space-md mb-space-lg"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-space-xs">
          <span
            aria-hidden="true"
            className="w-2.5 h-2.5 rounded-full bg-primary-container"
          />
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Instructor Announcements &amp; Updates
          </h2>
        </div>
        <a
          href="#announcements"
          className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors inline-flex items-center gap-0.5"
        >
          <span>View Notification Archive</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {INSTRUCTOR_ANNOUNCEMENTS.map((item) => (
          <article
            key={item.id}
            className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-md"
          >
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span
                  className={`px-2 py-0.5 rounded-full ${item.badgeClass} font-caption text-caption font-bold`}
                >
                  {item.badge}
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  {item.timeAgo}
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold mt-1">
                {item.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                {item.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-space-xs pt-space-xs">
              <Image
                src={item.avatar}
                alt={item.avatarAlt}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                  {item.authorName}
                </span>
                <span className="font-caption text-caption text-secondary truncate">
                  {item.authorRole}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
