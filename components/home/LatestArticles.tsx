import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LATEST_ARTICLES } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function LatestArticles() {
  return (
    <section
      id="latest-articles"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Academic Insights
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
              Latest Articles &amp; Tech Trends
            </h2>
          </div>
          <a
            href="#latest-articles"
            data-path="/blog"
            className="font-label-md text-label-md text-primary-container hover:text-primary font-semibold inline-flex items-center gap-1 transition-colors w-fit"
          >
            <span>Visit Academic Journal</span>
            <ChevronRight className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {LATEST_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.thumbnail}
                  alt={article.thumbnailAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption">
                    <span className="text-secondary font-semibold">
                      {article.category}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary font-bold transition-colors line-clamp-2">
                    <a
                      href="#latest-articles"
                      data-path={`/blog/${article.slug}`}
                    >
                      {article.title}
                    </a>
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    {article.excerpt}
                  </p>
                </div>

                <a
                  href="#latest-articles"
                  data-path={`/blog/${article.slug}`}
                  className="font-label-md text-label-md text-primary-container font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform w-fit"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
