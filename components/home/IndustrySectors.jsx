import {
  Brain,
  ChevronRight,
  DraftingCompass,
  MousePointerClick,
  PenTool,
  Shield,
  Terminal,
} from "lucide-react";
import { INDUSTRY_SECTORS } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

function renderSectorIcon(icon) {
  const iconClass = "w-[26px] h-[26px]";
  switch (icon) {
    case "terminal":
      return <Terminal className={iconClass} aria-hidden="true" />;
    case "design":
      return <DraftingCompass className={iconClass} aria-hidden="true" />;
    case "ai":
      return <Brain className={iconClass} aria-hidden="true" />;
    case "marketing":
      return <MousePointerClick className={iconClass} aria-hidden="true" />;
    case "graphic":
      return <PenTool className={iconClass} aria-hidden="true" />;
    case "security":
      return <Shield className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function IndustrySectors() {
  return (
    <section
      id="industry-sectors"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Curated Specializations
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
              Explore Industry Sectors
            </h2>
          </div>
          <a
            href="#featured-courses"
            data-path="/courses"
            className="font-label-md text-label-md text-primary-container hover:text-primary font-semibold inline-flex items-center gap-1 transition-colors w-fit"
          >
            <span>View All 18 Specialized Tracks</span>
            <ChevronRight className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-md">
          {INDUSTRY_SECTORS.map((sector) => (
            <a
              key={sector.id}
              href={sector.href}
              data-path={`/courses?category=${sector.id}`}
              className="group flex flex-col p-space-md bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors mb-space-md">
                {renderSectorIcon(sector.icon)}
              </div>
              <span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                {sector.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {sector.courseCount}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
