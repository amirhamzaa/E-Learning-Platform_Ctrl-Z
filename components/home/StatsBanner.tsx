import { IMPACT_STATS } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function StatsBanner() {
  return (
    <section
      aria-label="Shikhbe Shobai Impact Statistics"
      className="w-full bg-primary py-space-xl text-on-primary relative overflow-hidden"
    >
      <Container className="px-gutter-mobile sm:px-gutter relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-lg text-center divide-y-0">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className={`font-display-hero text-display-hero-mobile sm:text-display-hero ${stat.valueColorClass} font-bold tracking-tight`}
              >
                {stat.value}
              </span>
              <span className="font-title-md text-title-md text-on-primary-container font-semibold">
                {stat.label}
              </span>
              <span className="font-caption text-caption text-surface-dim/80">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
