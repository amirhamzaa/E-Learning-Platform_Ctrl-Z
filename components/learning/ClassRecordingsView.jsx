"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  ArrowRight,
  ArrowUpDown,
  BadgeCheck,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FolderArchive,
  GraduationCap,
  Hourglass,
  Layers,
  Lightbulb,
  MessageSquare,
  Play,
  PlayCircle,
  RotateCcw,
  Search,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  RECORDINGS_BATCH_OPTIONS,
  RECORDINGS_FEATURED,
  RECORDINGS_FILTER_TABS,
  RECORDINGS_LIST,
  RECORDINGS_STATS,
} from "@/data/classRecordings";
import { PortalShell } from "@/components/dashboard/PortalShell";

function renderStatIcon(icon) {
  const cls = "w-6 h-6";
  switch (icon) {
    case "video":
      return <Video className={cls} aria-hidden="true" />;
    case "layers":
      return <Layers className={cls} aria-hidden="true" />;
    case "verified":
      return <BadgeCheck className={cls} aria-hidden="true" />;
    default:
      return <Hourglass className={cls} aria-hidden="true" />;
  }
}

export function ClassRecordingsView() {
  const [selectedBatch, setSelectedBatch] = useState(RECORDINGS_BATCH_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(() =>
    RECORDINGS_LIST.filter((r) => r.bookmarkedByDefault).map((r) => r.id)
  );
  const [previewItem, setPreviewItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredRecordings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = RECORDINGS_LIST.filter((item) => {
      if (bookmarksOnly && !bookmarkedIds.includes(item.id)) return false;
      if (activeTab === "basics" && item.category !== "basics") return false;
      if (activeTab === "backend" && item.category !== "backend") return false;
      if (activeTab === "masterclass" && item.category !== "masterclass") return false;
      if (activeTab === "guest" && !item.isGuest) return false;
      if (activeTab === "unwatched" && item.status !== "unwatched") return false;
      if (query) {
        const hay = `${item.title} ${item.mentor} ${item.moduleLabel} ${item.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sortOrder) {
      case "oldest":
        sorted.sort((a, b) => a.order - b.order);
        break;
      case "longest":
        sorted.sort((a, b) => b.durationMinutes - a.durationMinutes);
        break;
      case "bookmarked":
        sorted.sort((a, b) => b.bookmarks - a.bookmarks);
        break;
      default:
        sorted.sort((a, b) => b.order - a.order);
        break;
    }
    return sorted;
  }, [searchQuery, sortOrder, activeTab, bookmarksOnly, bookmarkedIds]);

  return (
    <PortalShell activeRole="student" activeNav="class-recordings">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Banner & Action Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              Archive Synchronized
            </span>
            <span className="font-caption text-caption text-secondary">Updated 2 hours ago</span>
          </div>
          <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
            Class Recordings &amp; Masterclass Archive
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Access high-definition recordings, lesson resources, and timestamped bookmarks of all
            completed live sessions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setBookmarksOnly((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg transition-colors shadow-sm font-label-md text-label-md ${
              bookmarksOnly
                ? "bg-secondary-fixed text-on-secondary-fixed font-semibold"
                : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
            }`}
          >
            <Bookmark className="w-4 h-4 text-secondary" aria-hidden="true" />
            <span>My Bookmarks ({bookmarkedIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() =>
              showToast("Preparing full batch archive zip bundle (UI preview).")
            }
            className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-secondary transition-colors shadow-md font-label-md text-label-md"
          >
            <Archive className="w-4 h-4" aria-hidden="true" />
            <span>Download All Resources (.zip)</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Counter Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        {RECORDINGS_STATS.map((stat) => (
          <div
            key={stat.label}
            className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex items-start justify-between gap-2"
          >
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="font-headline-md sm:font-headline-lg text-headline-md sm:text-headline-lg text-on-surface font-semibold mt-1">
                {stat.value}{" "}
                {stat.valueSuffix && (
                  <span className="font-title-md text-title-md text-on-surface-variant font-normal">
                    {stat.valueSuffix}
                  </span>
                )}
              </span>
              {stat.progress ? (
                <div className="w-28 bg-surface-container-high rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-tertiary-container h-1.5 rounded-full"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : (
                <span className={`font-caption text-caption ${stat.subtextTone} mt-0.5`}>
                  {stat.subtext}
                </span>
              )}
            </div>
            <div
              className={`w-11 h-11 rounded-lg ${stat.iconWrap} flex items-center justify-center shrink-0`}
            >
              {renderStatIcon(stat.icon)}
            </div>
          </div>
        ))}
      </section>

      {/* Featured / Continue Watching Hero Card */}
      <section className="relative w-full rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden mb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div
            onClick={() => setPreviewItem(RECORDINGS_FEATURED)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setPreviewItem(RECORDINGS_FEATURED);
              }
            }}
            className="lg:col-span-6 relative min-h-[260px] lg:min-h-[360px] bg-inverse-surface group cursor-pointer overflow-hidden"
          >
            <Image
              src={RECORDINGS_FEATURED.thumbnail}
              alt={RECORDINGS_FEATURED.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                LATEST RECORDING
              </span>
              <span className="px-2 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-caption text-caption font-semibold">
                1080p Full HD
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-md bg-surface/80 backdrop-blur-md text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {RECORDINGS_FEATURED.duration}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary-container/95 text-on-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 fill-current ml-0.5" aria-hidden="true" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-inverse-on-surface font-caption text-caption mb-1.5">
                <span>{RECORDINGS_FEATURED.watchedText}</span>
                <span className="font-semibold text-secondary-fixed">
                  {RECORDINGS_FEATURED.progress}% Completed
                </span>
              </div>
              <div className="w-full bg-surface-container-lowest/30 backdrop-blur-sm rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-secondary-fixed h-1.5 rounded-full"
                  style={{ width: `${RECORDINGS_FEATURED.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-space-lg lg:p-space-xl flex flex-col justify-between bg-surface-container-lowest">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                  {RECORDINGS_FEATURED.batchTag}
                </span>
                <span className="font-caption text-caption text-secondary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {RECORDINGS_FEATURED.recordedLabel}
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight mb-2">
                {RECORDINGS_FEATURED.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-space-md">
                {RECORDINGS_FEATURED.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 p-space-sm bg-surface rounded-xl mb-space-md">
                <Image
                  src={RECORDINGS_FEATURED.mentor.avatar}
                  alt={RECORDINGS_FEATURED.mentor.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {RECORDINGS_FEATURED.mentor.name}
                  </span>
                  <span className="font-caption text-caption text-secondary">
                    {RECORDINGS_FEATURED.mentor.role}
                  </span>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-caption text-caption">
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  {RECORDINGS_FEATURED.qaCount}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-space-md">
                {RECORDINGS_FEATURED.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-caption text-caption"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-space-sm">
              <Link
                href="/video-learning"
                className="inline-flex items-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary hover:bg-secondary transition-colors font-label-md text-label-md shadow-md"
              >
                <PlayCircle className="w-5 h-5" aria-hidden="true" />
                <span>Resume Watching ({RECORDINGS_FEATURED.resumeTime})</span>
              </Link>
              <button
                type="button"
                onClick={() =>
                  showToast("Session #42 notes & starter repo ready (UI preview).")
                }
                className="inline-flex items-center gap-2 px-space-md py-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
              >
                <Download className="w-4 h-4 text-secondary" aria-hidden="true" />
                <span>Download Notes &amp; Code</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search, Filter & Course Switcher Header */}
      <div className="flex flex-col gap-space-md mb-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
          <div className="relative min-w-[260px]">
            <label
              htmlFor="batch-select"
              className="block font-caption text-caption text-secondary uppercase font-semibold mb-1"
            >
              Enrolled Course Batch
            </label>
            <div className="relative">
              <GraduationCap
                aria-hidden="true"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
              />
              <select
                id="batch-select"
                value={selectedBatch}
                onChange={(event) => setSelectedBatch(event.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold focus:outline-none focus:ring-2 focus:ring-primary-container/20 cursor-pointer"
              >
                {RECORDINGS_BATCH_OPTIONS.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 relative">
            <label
              htmlFor="archive-search"
              className="block font-caption text-caption text-secondary uppercase font-semibold mb-1"
            >
              Search Archives
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
              <input
                id="archive-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by topic, instructor, keywords, or lesson number..."
                className="w-full pl-9 pr-9 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear archive search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="min-w-[180px]">
            <label
              htmlFor="archive-sort"
              className="block font-caption text-caption text-secondary uppercase font-semibold mb-1"
            >
              Sort Order
            </label>
            <div className="relative">
              <ArrowUpDown
                aria-hidden="true"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
              />
              <select
                id="archive-sort"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary-container/20 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="longest">Longest Duration</option>
                <option value="bookmarked">Most Bookmarked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {RECORDINGS_FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  isActive
                    ? "px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold shrink-0 shadow-sm flex items-center gap-1.5"
                    : "px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md shrink-0 shadow-sm flex items-center gap-1.5"
                }
              >
                {tab.id === "unwatched" && (
                  <CheckCircle2 className="w-4 h-4 text-tertiary" aria-hidden="true" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recordings 3-Column Grid */}
      {filteredRecordings.length === 0 ? (
        <div className="rounded-2xl bg-surface-container-lowest p-space-xl text-center shadow-sm mb-space-xl">
          <p className="font-title-md text-title-md text-on-surface font-bold mb-1">
            No recordings match your current filters
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Try switching filter tabs or clearing your search keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTab("all");
              setSearchQuery("");
              setBookmarksOnly(false);
            }}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
          >
            Show All Recordings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg mb-space-xl">
          {filteredRecordings.map((rec) => {
            const isBookmarked = bookmarkedIds.includes(rec.id);
            return (
              <article
                key={rec.id}
                className="group rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative aspect-video w-full bg-surface-container overflow-hidden">
                  <Image
                    src={rec.thumbnail}
                    alt={rec.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  <span
                    className={`absolute top-3 left-3 px-2 py-0.5 rounded-md font-caption text-caption font-semibold flex items-center gap-1 ${
                      rec.status === "completed"
                        ? "bg-tertiary-fixed text-on-tertiary-fixed"
                        : rec.status === "in-progress"
                          ? "bg-secondary-fixed text-on-secondary-fixed"
                          : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {rec.status === "completed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : rec.status === "in-progress" ? (
                      <Hourglass className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {rec.statusLabel}
                  </span>

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-sm text-secondary font-caption text-caption">
                    {rec.date}
                  </span>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-caption text-caption font-bold">
                      1080p
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-on-surface font-caption text-caption font-semibold">
                      {rec.duration}
                    </span>
                  </div>

                  {rec.progress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-container-high">
                      <div className="bg-secondary h-1" style={{ width: `${rec.progress}%` }} />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setPreviewItem(rec)}
                    aria-label={`Play ${rec.title}`}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-primary-container/90 text-on-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-lg"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-space-md flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 text-secondary font-caption text-caption truncate">
                        <span className="font-semibold text-primary">{rec.sessionNumber}</span>
                        <span>•</span>
                        <span className="truncate">{rec.moduleLabel}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(rec.id)}
                        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark recording"}
                        className={`p-1 rounded transition-colors ${
                          isBookmarked ? "text-primary" : "text-outline hover:text-on-surface"
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <h3 className="font-title-md text-title-md text-on-surface font-bold line-clamp-2 mb-2 group-hover:text-primary-container transition-colors">
                      {rec.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <Image
                        src={rec.mentorAvatar}
                        alt={rec.mentor}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        {rec.mentor}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {rec.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewItem(rec)}
                      className="flex-1 py-2 px-3 rounded-lg bg-primary-container text-on-primary hover:bg-secondary transition-colors font-label-md text-label-md font-semibold text-center flex items-center justify-center gap-1.5"
                    >
                      {rec.status === "completed" ? (
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      ) : rec.status === "in-progress" ? (
                        <PlayCircle className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                      )}
                      <span>{rec.ctaLabel}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        showToast(`Downloading class assets for ${rec.sessionNumber} (UI preview).`)
                      }
                      aria-label={`Download assets for ${rec.sessionNumber}`}
                      className="w-9 h-9 rounded-lg bg-surface-container text-secondary hover:bg-surface-container-high hover:text-on-surface flex items-center justify-center transition-colors shrink-0"
                    >
                      <FolderArchive className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Bottom Pagination & Results Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-md border-t border-surface-container">
        <div className="font-body-sm text-body-sm text-on-surface-variant">
          Showing <span className="font-semibold text-on-surface">1 - {filteredRecordings.length}</span> of{" "}
          <span className="font-semibold text-on-surface">42</span> class recordings
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Previous recordings page"
            className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          {[1, 2, 3, 7].map((page, idx) => (
            <span key={page} className="inline-flex items-center gap-1.5">
              {idx === 3 && (
                <span className="px-1 text-on-surface-variant font-caption text-caption">…</span>
              )}
              <button
                type="button"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "w-9 h-9 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm"
                    : "w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors"
                }
              >
                {page}
              </button>
            </span>
          ))}
          <button
            type="button"
            disabled={currentPage === 7}
            onClick={() => setCurrentPage((p) => Math.min(7, p + 1))}
            aria-label="Next recordings page"
            className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Pro-tip Banner */}
      <div className="mt-space-xl p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">
              Pro-tip for Live Class Learners
            </p>
            <p className="font-caption text-caption text-secondary">
              Recordings are automatically transcoded and uploaded in 1080p within 4 hours of live
              class completion.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            showToast("Re-upload request logged with Academic Operations (UI preview).")
          }
          className="inline-flex items-center gap-1 text-primary-container font-label-md text-label-md font-semibold hover:underline shrink-0"
        >
          <span>Request Specific Class Re-upload</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Recording Preview Modal */}
      {previewItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Recording Player Preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/70 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-surface-container-lowest overflow-hidden shadow-2xl">
            <div className="px-space-lg py-space-md flex items-center justify-between border-b border-surface-container">
              <h3 className="font-title-md text-title-md text-on-surface font-bold truncate pr-4">
                {previewItem.title}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label="Close recording preview"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-inverse-surface">
              <Image
                src={previewItem.thumbnail}
                alt={previewItem.title}
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-inverse-on-surface p-6 text-center">
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">
                  1080p Archive Stream Ready • {previewItem.duration}
                </span>
                <Link
                  href="/video-learning"
                  className="px-space-lg py-2.5 rounded-xl bg-surface text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors"
                >
                  Launch Full Classroom Player
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
