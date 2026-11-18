"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BookmarkPlus,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Download,
  FileCode2,
  FileQuestion,
  FileText,
  FolderArchive,
  Headphones,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Lock,
  Maximize2,
  MessageSquare,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Search,
  Send,
  Shield,
  SkipBack,
  Subtitles,
  Terminal,
  ThumbsUp,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  VIDEO_CURRICULUM_MODULES,
  VIDEO_INITIAL_DISCUSSIONS,
  VIDEO_LESSON_INFO,
  VIDEO_RESOURCES,
} from "@/data/videoLearning";
import { PortalShell } from "@/components/dashboard/PortalShell";

const PLAYBACK_SPEEDS = ["0.75x", "1x", "1.25x", "1.5x", "2x"];
const RESOLUTIONS = ["1080p HD", "720p HD", "480p"];

function formatClock(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function VideoLearningView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(VIDEO_LESSON_INFO.initialSeconds);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(2); // 1.25x
  const [resIdx, setResIdx] = useState(0); // 1080p HD
  const [captionsOn, setCaptionsOn] = useState(true);
  const [cinemaFocus, setCinemaFocus] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [completedCount, setCompletedCount] = useState(VIDEO_LESSON_INFO.completedLessons);
  const [activeLessonId, setActiveLessonId] = useState("l-4-2");
  const [completedLessons, setCompletedLessons] = useState(["l-1-1", "l-1-2", "l-2-1", "l-2-2", "l-3-1", "l-4-1"]);
  const [openModules, setOpenModules] = useState(["m4"]);
  const [curriculumSearch, setCurriculumSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [discussions, setDiscussions] = useState(VIDEO_INITIAL_DISCUSSIONS);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setCurrentSec((prev) =>
        prev >= VIDEO_LESSON_INFO.durationSeconds ? VIDEO_LESSON_INFO.durationSeconds : prev + 1
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const progressPercent = Math.round((completedCount / VIDEO_LESSON_INFO.totalLessons) * 100);
  const videoScrubPercent = Math.min(
    100,
    Math.max(0, (currentSec / VIDEO_LESSON_INFO.durationSeconds) * 100)
  );

  const allModulesOpen = openModules.length >= 4;

  const toggleModule = (id) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllModules = () => {
    if (allModulesOpen) {
      setOpenModules([]);
    } else {
      setOpenModules(["m1", "m2", "m3", "m4"]);
    }
  };

  const filteredModules = useMemo(() => {
    const q = curriculumSearch.trim().toLowerCase();
    if (!q) return VIDEO_CURRICULUM_MODULES;
    return VIDEO_CURRICULUM_MODULES.filter(
      (mod) =>
        mod.title.toLowerCase().includes(q) ||
        mod.lessons.some((l) => l.title.toLowerCase().includes(q))
    );
  }, [curriculumSearch]);

  const handleMarkComplete = () => {
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons((prev) => [...prev, activeLessonId]);
      setCompletedCount((prev) => Math.min(VIDEO_LESSON_INFO.totalLessons, prev + 1));
    }
    showToast("Lesson marked complete! Progress updated.");
  };

  const handleCopyCode = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(VIDEO_LESSON_INFO.codeSnippet).catch(() => {});
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePostQuestion = (event) => {
    event.preventDefault();
    const trimmed = newQuestion.trim();
    if (!trimmed) return;
    setDiscussions((prev) => [
      {
        id: `disc-${Date.now()}`,
        author: "Student Learner",
        avatar: VIDEO_LESSON_INFO.studentAvatar,
        timeAgo: "Just now",
        upvotes: 1,
        question: trimmed,
        reply: null,
      },
      ...prev,
    ]);
    setNewQuestion("");
    showToast("Your question was posted to the class thread.");
  };

  const toggleUpvote = (id) => {
    setUpvotedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <PortalShell activeRole="student" activeNav="my-courses" flushMain>
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Dedicated Classroom Navigation Bar */}
      <div className="sticky top-16 z-30 w-full bg-surface-container-lowest shadow-sm px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 border-b border-surface-container">
        <nav
          aria-label="Lesson Breadcrumb"
          className="flex items-center gap-1.5 min-w-0 text-on-surface-variant font-caption text-caption overflow-x-auto"
        >
          <Link href="/student/dashboard" className="hover:text-primary transition-colors shrink-0">
            Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-outline shrink-0" aria-hidden="true" />
          <span className="truncate max-w-[140px]">{VIDEO_LESSON_INFO.courseTitle}</span>
          <ChevronRight className="w-3.5 h-3.5 text-outline shrink-0" aria-hidden="true" />
          <span className="hidden md:inline truncate max-w-[160px]">
            {VIDEO_LESSON_INFO.moduleTitle}
          </span>
          <ChevronRight
            className="hidden md:inline w-3.5 h-3.5 text-outline shrink-0"
            aria-hidden="true"
          />
          <span className="font-label-sm text-label-sm font-semibold text-primary truncate max-w-[240px]">
            {VIDEO_LESSON_INFO.shortTitle}
          </span>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm font-bold text-tertiary">
                {progressPercent}% Completed
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                ({completedCount}/{VIDEO_LESSON_INFO.totalLessons} lessons)
              </span>
            </div>
            <div className="w-40 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-tertiary-container rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="h-6 w-px bg-surface-container-high hidden sm:block" />

          <Link
            href="/student/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden md:inline font-semibold">My Courses</span>
          </Link>

          <Image
            src={VIDEO_LESSON_INFO.studentAvatar}
            alt="Learner avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-primary-container/20"
          />
        </div>
      </div>

      {/* Classroom Split Stage Layout */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 min-h-[calc(100vh-120px)] bg-surface">
        {/* Left Main Learning Canvas (8 Cols) */}
        <section
          className={`${
            cinemaFocus ? "xl:col-span-12" : "xl:col-span-8"
          } p-4 lg:p-6 flex flex-col gap-6 min-w-0`}
        >
          {/* High Fidelity Video Player Wrapper */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-inverse-surface shadow-xl flex flex-col aspect-video select-none group">
            <Image
              src={VIDEO_LESSON_INFO.videoBackground}
              alt="Code editor video lecture screen"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-[2px]" />

            {/* Top Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-b from-inverse-surface/90 to-transparent flex items-start justify-between gap-3 z-10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-container/90 text-on-primary font-caption text-caption font-semibold tracking-wide uppercase shrink-0">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  In Progress
                </span>
                <h1 className="text-inverse-on-surface font-title-md text-label-md sm:text-title-md font-semibold tracking-tight truncate">
                  {VIDEO_LESSON_INFO.lessonTitle}
                </h1>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    showToast(`Bookmarked timestamp at ${formatClock(currentSec)}.`)
                  }
                  aria-label="Bookmark timestamp"
                  className="p-2 rounded-lg bg-inverse-surface/50 hover:bg-inverse-surface/80 text-inverse-on-surface transition-colors"
                >
                  <BookmarkPlus className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setCinemaFocus((prev) => !prev)}
                  aria-label="Toggle cinema focus mode"
                  className={`p-2 rounded-lg transition-colors ${
                    cinemaFocus
                      ? "bg-primary-container text-on-primary"
                      : "bg-inverse-surface/50 hover:bg-inverse-surface/80 text-inverse-on-surface"
                  }`}
                >
                  <Lightbulb className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Central Play/Pause Trigger */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? "Pause lesson" : "Play lesson"}
                className="w-16 h-16 rounded-full bg-primary-container/90 hover:bg-primary-container hover:scale-105 active:scale-95 text-on-primary shadow-2xl flex items-center justify-center transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="w-8 h-8 fill-current translate-x-0.5" aria-hidden="true" />
                )}
              </button>
              {captionsOn && (
                <p className="hidden sm:block px-3 py-1 rounded-md bg-inverse-surface/80 text-inverse-on-surface font-body-sm text-body-sm max-w-lg text-center">
                  &ldquo;Store refresh tokens in HttpOnly Secure cookies to eliminate XSS token
                  theft.&rdquo;
                </p>
              )}
            </div>

            {/* Bottom Floating Video Controls Bar */}
            <div className="relative z-10 p-3.5 sm:p-4 bg-gradient-to-t from-inverse-surface via-inverse-surface/85 to-transparent flex flex-col gap-2.5">
              {/* Scrub Bar */}
              <input
                type="range"
                min={0}
                max={VIDEO_LESSON_INFO.durationSeconds}
                value={currentSec}
                onChange={(event) => setCurrentSec(Number(event.target.value))}
                aria-label="Seek video timeline"
                className="w-full accent-primary-fixed-dim h-1.5 cursor-pointer"
              />

              {/* Controls Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-inverse-on-surface">
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="hover:text-primary-fixed transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" aria-hidden="true" />
                    ) : (
                      <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSec((prev) => Math.max(0, prev - 10))}
                    aria-label="Rewind 10 seconds"
                    className="hover:text-primary-fixed transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSec((prev) =>
                        Math.min(VIDEO_LESSON_INFO.durationSeconds, prev + 10)
                      )
                    }
                    aria-label="Forward 10 seconds"
                    className="hover:text-primary-fixed transition-colors"
                  >
                    <RotateCw className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMuted((prev) => !prev)}
                    aria-label={muted ? "Unmute" : "Mute"}
                    className="hover:text-primary-fixed transition-colors"
                  >
                    {muted ? (
                      <VolumeX className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                  <div className="font-caption text-caption font-mono text-inverse-on-surface/80">
                    <span className="text-inverse-on-surface font-semibold">
                      {formatClock(currentSec)}
                    </span>{" "}
                    / {formatClock(VIDEO_LESSON_INFO.durationSeconds)} ({Math.round(videoScrubPercent)}%)
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setSpeedIdx((prev) => (prev + 1) % PLAYBACK_SPEEDS.length)}
                    className="px-2 py-0.5 rounded text-caption font-label-sm font-semibold bg-inverse-surface/60 hover:bg-inverse-surface text-secondary-fixed transition-colors"
                  >
                    {PLAYBACK_SPEEDS[speedIdx]}
                  </button>
                  <button
                    type="button"
                    onClick={() => setResIdx((prev) => (prev + 1) % RESOLUTIONS.length)}
                    className="px-2 py-0.5 rounded text-caption font-label-sm font-semibold bg-inverse-surface/60 hover:bg-inverse-surface text-inverse-on-surface/90 transition-colors"
                  >
                    {RESOLUTIONS[resIdx]}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaptionsOn((prev) => !prev)}
                    aria-label="Toggle subtitles"
                    className={`transition-colors ${
                      captionsOn ? "text-secondary-fixed" : "text-inverse-on-surface/70"
                    }`}
                  >
                    <Subtitles className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCinemaFocus((prev) => !prev)}
                    aria-label="Toggle expanded view"
                    className="hover:text-primary-fixed transition-colors"
                  >
                    <Maximize2 className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Under-Video Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-lowest shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveLessonId("l-4-1");
                  showToast("Switched to Lesson 4.1: Password Hashing with Bcrypt");
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all"
              >
                <SkipBack className="w-4 h-4" aria-hidden="true" />
                <span>Previous Lesson</span>
              </button>
              <button
                type="button"
                onClick={handleMarkComplete}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:shadow transition-all"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Mark as Complete &amp; Next</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Autoplay Next
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoplayNext}
                    onChange={(event) => setAutoplayNext(event.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container" />
                </div>
              </label>
              <div className="h-5 w-px bg-surface-container" />
              <button
                type="button"
                onClick={() => setActiveTab("discussion")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:text-primary font-label-sm text-label-sm font-semibold transition-colors"
              >
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                <span>Ask a Question</span>
              </button>
            </div>
          </div>

          {/* Tabbed Classroom Workspace */}
          <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 p-1 bg-surface-container-low rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={
                  activeTab === "overview"
                    ? "px-4 py-2 rounded-lg font-label-md text-label-md font-semibold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2"
                    : "px-4 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2"
                }
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Lesson Overview &amp; Notes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("resources")}
                className={
                  activeTab === "resources"
                    ? "px-4 py-2 rounded-lg font-label-md text-label-md font-semibold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2"
                    : "px-4 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2"
                }
              >
                <FolderArchive className="w-4 h-4" aria-hidden="true" />
                <span>Downloadable Resources</span>
                <span className="px-1.5 py-0.5 rounded-full bg-surface-container text-caption font-caption text-on-surface-variant font-bold">
                  {VIDEO_RESOURCES.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("discussion")}
                className={
                  activeTab === "discussion"
                    ? "px-4 py-2 rounded-lg font-label-md text-label-md font-semibold bg-surface-container-lowest text-primary shadow-sm transition-all flex items-center gap-2"
                    : "px-4 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2"
                }
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Discussion &amp; Q&amp;A</span>
                <span className="px-1.5 py-0.5 rounded-full bg-secondary-fixed text-caption font-caption text-on-secondary-fixed font-bold">
                  {27 + discussions.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Overview & Notes */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-low">
                  <div className="flex items-center gap-3">
                    <Image
                      src={VIDEO_LESSON_INFO.instructor.avatar}
                      alt={VIDEO_LESSON_INFO.instructor.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-primary-container/20"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-title-md text-title-md font-bold text-on-surface">
                          {VIDEO_LESSON_INFO.instructor.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-caption font-semibold">
                          {VIDEO_LESSON_INFO.instructor.badge}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {VIDEO_LESSON_INFO.instructor.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <BadgeCheck className="w-5 h-5 text-tertiary" aria-hidden="true" />
                    <span className="font-caption text-caption text-tertiary font-semibold uppercase tracking-wider">
                      Verified MERN Curriculum
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                    {VIDEO_LESSON_INFO.overviewHeading}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {VIDEO_LESSON_INFO.overviewBody}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {VIDEO_LESSON_INFO.takeaways.map((card) => (
                    <div
                      key={card.title}
                      className="p-4 rounded-xl bg-surface-container flex flex-col gap-2"
                    >
                      <div
                        className={`flex items-center gap-2 ${card.tone} font-semibold font-title-md text-title-md`}
                      >
                        {card.icon === "shield" ? (
                          <Shield className="w-5 h-5" aria-hidden="true" />
                        ) : card.icon === "sync" ? (
                          <RefreshCw className="w-5 h-5" aria-hidden="true" />
                        ) : (
                          <KeyRound className="w-5 h-5" aria-hidden="true" />
                        )}
                        <span>{card.title}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
                      Next.js Route Handler Implementation (/api/auth/refresh/route.js)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 text-caption font-caption text-primary hover:text-primary-container font-semibold transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
                          <span className="text-tertiary">Copied!</span>
                        </>
                      ) : (
                        <span>Copy Code</span>
                      )}
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface font-mono text-caption p-4 shadow-inner">
                    <pre className="overflow-x-auto leading-relaxed">
                      <code>{VIDEO_LESSON_INFO.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Downloadable Resources */}
            {activeTab === "resources" && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-title-md text-title-md font-semibold text-on-surface">
                    Included Class Lesson Assets
                  </h3>
                  <span className="font-caption text-caption text-on-surface-variant">
                    All source files verified for Next.js 14+
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {VIDEO_RESOURCES.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container flex flex-col justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${res.bgClass} flex items-center justify-center shrink-0`}
                        >
                          {res.icon === "zip" ? (
                            <FolderArchive className="w-5 h-5" aria-hidden="true" />
                          ) : res.icon === "pdf" ? (
                            <FileText className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <FileCode2 className="w-5 h-5" aria-hidden="true" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-title-md text-title-md font-semibold text-on-surface truncate">
                            {res.name}
                          </h4>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {res.meta}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Preparing ${res.name} download (UI preview).`)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm hover:shadow transition-all"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        <span>{res.cta}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Discussion & Q&A */}
            {activeTab === "discussion" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-title-md text-title-md font-semibold text-on-surface">
                    Community Questions &amp; Support
                  </h3>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Average response time: &lt; 2 hrs
                  </span>
                </div>

                <form
                  onSubmit={handlePostQuestion}
                  className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3"
                >
                  <textarea
                    value={newQuestion}
                    onChange={(event) => setNewQuestion(event.target.value)}
                    placeholder="Have a doubt about cookie domain settings, token expiration, or SSR hydration? Ask here..."
                    className="w-full h-24 p-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 placeholder:text-on-surface-variant/70 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-on-surface-variant">
                      Markdown formatting supported
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Post Question</span>
                    </button>
                  </div>
                </form>

                <div className="flex flex-col gap-4">
                  {discussions.map((item) => {
                    const isUpvoted = upvotedIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.avatar}
                              alt={item.author}
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-title-md text-title-md font-semibold text-on-surface">
                                {item.author}
                              </span>
                              <span className="font-caption text-caption text-on-surface-variant ml-2">
                                {item.timeAgo}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleUpvote(item.id)}
                            className={`flex items-center gap-1 font-caption text-caption font-semibold transition-colors ${
                              isUpvoted
                                ? "text-primary"
                                : "text-on-surface-variant hover:text-primary"
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                            <span>{item.upvotes + (isUpvoted ? 1 : 0)}</span>
                          </button>
                        </div>

                        <p className="font-body-sm text-body-sm text-on-surface font-medium">
                          {item.question}
                        </p>

                        {item.reply && (
                          <div className="p-3.5 rounded-lg bg-surface-container-lowest flex flex-col gap-2 shadow-sm ml-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">
                                {item.reply.badge}
                              </span>
                              <span className="font-label-sm text-label-sm font-bold text-on-surface">
                                {item.reply.author}
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {item.reply.text}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Sticky Course Curriculum Sidebar (4 Cols) */}
        {!cinemaFocus && (
          <aside className="xl:col-span-4 p-4 lg:p-6 bg-surface-container-low flex flex-col gap-4 xl:overflow-y-auto xl:max-h-[calc(100vh-120px)] xl:sticky xl:top-[120px]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h2 className="font-title-md text-title-md font-bold text-on-surface">
                    Course Curriculum
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAllModules}
                  className="font-caption text-caption font-semibold text-primary hover:text-primary-container"
                >
                  {allModulesOpen ? "Collapse All" : "Expand All"}
                </button>
              </div>

              <div className="relative w-full">
                <Search
                  aria-hidden="true"
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
                <input
                  type="text"
                  value={curriculumSearch}
                  onChange={(event) => setCurriculumSearch(event.target.value)}
                  aria-label="Search lessons in this course"
                  placeholder="Search lessons in this course..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {filteredModules.map((mod) => {
                const isLocked = mod.status === "locked";
                const isOpen = openModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    className={`rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden ${
                      mod.status === "active" ? "ring-2 ring-primary-container/20" : ""
                    } ${isLocked ? "opacity-60" : ""}`}
                  >
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full flex items-center justify-between p-3.5 text-left transition-colors ${
                        isLocked
                          ? "cursor-not-allowed"
                          : mod.status === "active"
                            ? "bg-surface-container"
                            : "hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {mod.status === "completed" ? (
                          <CheckCircle2
                            className="w-5 h-5 text-tertiary shrink-0"
                            aria-hidden="true"
                          />
                        ) : mod.status === "active" ? (
                          <CircleDot
                            className="w-5 h-5 text-primary shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <Lock className="w-5 h-5 text-outline shrink-0" aria-hidden="true" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-label-md text-label-md font-bold text-on-surface truncate">
                              {mod.title}
                            </h3>
                            {mod.status === "active" && (
                              <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-caption text-[10px] font-bold shrink-0">
                                Active
                              </span>
                            )}
                          </div>
                          <span
                            className={`font-caption text-caption font-semibold ${
                              mod.status === "completed"
                                ? "text-tertiary"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {mod.meta}
                          </span>
                        </div>
                      </div>
                      {isLocked ? (
                        <Lock className="w-4 h-4 text-outline shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown
                          className={`w-4 h-4 text-on-surface-variant shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    {!isLocked && isOpen && mod.lessons.length > 0 && (
                      <div className="p-2 flex flex-col gap-1.5">
                        {mod.lessons.map((lesson) => {
                          const isCurrent = activeLessonId === lesson.id;
                          const isDone = completedLessons.includes(lesson.id);

                          if (lesson.status === "locked") {
                            return (
                              <div
                                key={lesson.id}
                                className="p-2.5 rounded-lg opacity-70 flex items-center justify-between gap-3 text-on-surface-variant"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <Lock className="w-4 h-4 text-outline shrink-0" aria-hidden="true" />
                                  <span className="font-body-sm text-body-sm truncate">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="font-caption text-caption shrink-0">
                                  {lesson.duration}
                                </span>
                              </div>
                            );
                          }

                          if (lesson.status === "quiz") {
                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                onClick={() =>
                                  showToast("Quiz 4 unlocks after Lesson 4.4 completion.")
                                }
                                className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-between gap-3 text-left transition-colors"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <FileQuestion
                                    className="w-4 h-4 text-secondary shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span className="font-body-sm text-body-sm truncate font-medium text-on-surface">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-surface-container text-caption font-caption text-secondary font-bold shrink-0">
                                  {lesson.duration}
                                </span>
                              </button>
                            );
                          }

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => setActiveLessonId(lesson.id)}
                              className={
                                isCurrent
                                  ? "p-2.5 rounded-lg bg-surface shadow-sm ring-1 ring-primary-container flex items-center justify-between gap-3 text-left"
                                  : "p-2.5 rounded-lg hover:bg-surface-container-low flex items-center justify-between gap-3 text-left transition-colors"
                              }
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {isCurrent ? (
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-container text-on-primary shrink-0">
                                    <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                                  </span>
                                ) : isDone ? (
                                  <CheckCircle2
                                    className="w-4 h-4 text-tertiary shrink-0"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Play className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                                )}
                                <span
                                  className={`font-body-sm text-body-sm truncate ${
                                    isCurrent
                                      ? "text-primary font-bold"
                                      : "text-on-surface-variant"
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              {isCurrent ? (
                                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-caption font-bold shrink-0">
                                  Playing
                                </span>
                              ) : (
                                <span className="font-caption text-caption text-on-surface-variant shrink-0">
                                  {lesson.duration}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mentor Support Banner */}
            <div className="mt-auto p-4 rounded-xl bg-surface-container flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-label-sm text-label-sm font-bold text-on-surface">
                  Need 1-on-1 Mentor Support?
                </h3>
                <p className="font-caption text-caption text-on-surface-variant">
                  Live office hours start today at 8:00 PM
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </PortalShell>
  );
}
