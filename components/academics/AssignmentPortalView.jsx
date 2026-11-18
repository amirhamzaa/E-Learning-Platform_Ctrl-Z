"use client";

import Link from "next/link";
import {
  Archive,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Cloud,
  CloudUpload,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FolderArchive,
  Globe,
  Headphones,
  Hourglass,
  Info,
  ListChecks,
  Lock,
  MessageSquare,
  Paperclip,
  Pencil,
  Terminal,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  ASSIGNMENT_ASSETS,
  ASSIGNMENT_DELIVERABLES,
  ASSIGNMENT_HEADER,
  ASSIGNMENT_REVISIONS,
  ASSIGNMENT_RUBRIC,
} from "@/data/assignments";
import { PortalShell } from "@/components/dashboard/PortalShell";

export function AssignmentPortalView() {
  const [checkedIds, setCheckedIds] = useState(() =>
    ASSIGNMENT_DELIVERABLES.filter((d) => d.defaultDone).map((d) => d.id)
  );
  const [repoUrl, setRepoUrl] = useState(
    "https://github.com/shikhbe-learner/microservices-mern-docker"
  );
  const [liveUrl, setLiveUrl] = useState("https://lms-microservices-demo.shikhbeshobai.dev");
  const [notes, setNotes] = useState(
    `# Run instructions:
1. cp .env.example .env
2. docker compose -f docker-compose.prod.yml up --build -d
3. Seed admin user: \`docker exec -it auth-service npm run seed\`
Test credentials: mentor@shikhbeshobai.com / Pass@123456`
  );
  const [attachment, setAttachment] = useState({
    name: "architecture-design-document-v2.pdf",
    meta: "4.8 MB • Uploaded Oct 28, 9:42 PM",
  });
  const [copiedRepo, setCopiedRepo] = useState(false);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const toggleDeliverable = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyRepo = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(repoUrl).catch(() => {});
    }
    setCopiedRepo(true);
    setTimeout(() => setCopiedRepo(false), 1800);
  };

  const handleFilePick = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    setAttachment({
      name: file.name,
      meta: `${sizeMb} MB • Selected just now`,
    });
    showToast(`Attached ${file.name} (local preview).`);
  };

  const handleResubmit = (event) => {
    event.preventDefault();
    if (!repoUrl.trim() || !liveUrl.trim()) {
      showToast("Please provide both GitHub Repository URL and Live Production URL.");
      return;
    }
    showToast("Assignment Revision #2 draft saved & validated (UI preview).");
  };

  return (
    <PortalShell activeRole="student" activeNav="assignments">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex flex-col w-full gap-space-lg">
        {/* Top Breadcrumb & Assignment Header */}
        <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm"
            >
              <Link href="/student/dashboard" className="hover:text-primary-container transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Assignments</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-on-surface font-semibold truncate max-w-xs sm:max-w-md">
                Assignment #05: Microservices Architecture
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{ASSIGNMENT_HEADER.dueLabel}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                <Hourglass className="w-4 h-4" aria-hidden="true" />
                <span>{ASSIGNMENT_HEADER.statusLabel}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-2">
            <div className="max-w-3xl">
              <span className="font-caption text-caption uppercase tracking-wider text-secondary font-bold">
                {ASSIGNMENT_HEADER.moduleMeta}
              </span>
              <h1 className="font-headline-md sm:font-headline-lg text-headline-md sm:text-headline-lg text-primary mt-1">
                {ASSIGNMENT_HEADER.title}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                {ASSIGNMENT_HEADER.description}
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <a
                href="#evaluation-desk"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:opacity-95 transition-opacity"
              >
                <Pencil className="w-4 h-4" aria-hidden="true" />
                <span>Edit Submission</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Dual-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left 7 Cols */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary-container" aria-hidden="true" />
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Assignment Brief &amp; Objectives
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-caption text-caption font-semibold">
                  {ASSIGNMENT_HEADER.weightage}
                </span>
              </div>

              <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                {ASSIGNMENT_HEADER.briefText}
              </p>

              {/* Deliverables Checklist */}
              <div className="mt-2 bg-surface-container-low p-space-md rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-tertiary" aria-hidden="true" />
                    <span>Key Deliverables Checklist</span>
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {checkedIds.length} of {ASSIGNMENT_DELIVERABLES.length} Completed
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {ASSIGNMENT_DELIVERABLES.map((item) => {
                    const done = checkedIds.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-lowest cursor-pointer transition-colors hover:bg-surface-container"
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleDeliverable(item.id)}
                          className="mt-1 w-4 h-4 accent-primary rounded cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span
                            className={`font-label-md text-label-md font-semibold ${
                              done ? "line-through text-on-surface-variant" : "text-on-surface"
                            }`}
                          >
                            {item.title}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {item.detail}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Evaluation Rubric */}
              <div className="mt-space-sm flex flex-col gap-space-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                    <ClipboardCheck
                      className="w-4 h-4 text-primary-container"
                      aria-hidden="true"
                    />
                    <span>Evaluation Rubric &amp; Maximum Marks</span>
                  </h3>
                  <span className="font-label-sm text-label-sm font-bold text-primary-container">
                    Total: 100 Marks (Pass: 70)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {ASSIGNMENT_RUBRIC.map((crit) => (
                    <div
                      key={crit.title}
                      className="p-space-sm bg-surface-container-low rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {crit.title}
                          </span>
                          <span className="font-title-md text-title-md text-primary font-bold">
                            {crit.points}
                          </span>
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant">
                          {crit.description}
                        </p>
                      </div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                        <div
                          className={`${crit.barClass} h-full rounded-full`}
                          style={{ width: crit.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starter Assets */}
              <div className="mt-space-sm pt-space-md">
                <h3 className="font-title-md text-title-md text-on-surface mb-space-sm flex items-center gap-1.5">
                  <FolderArchive className="w-4 h-4 text-primary-container" aria-hidden="true" />
                  <span>Downloadable Starter Assets &amp; Boilerplates</span>
                </h3>
                <div className="flex flex-col sm:flex-row gap-space-sm">
                  {ASSIGNMENT_ASSETS.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex-1 flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            asset.tone === "primary"
                              ? "bg-primary-container/10 text-primary-container"
                              : "bg-tertiary/10 text-tertiary"
                          }`}
                        >
                          {asset.tone === "primary" ? (
                            <Archive className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <FileText className="w-5 h-5" aria-hidden="true" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            {asset.name}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {asset.meta}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Preparing ${asset.name} download (UI preview).`)}
                        aria-label={`Download ${asset.name}`}
                        className="shrink-0 p-2 rounded-lg text-primary hover:bg-surface-container-high transition-colors"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Mentor Info Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-space-md rounded-xl bg-surface-container-high/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">
                  TH
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Lead Evaluator: Engr. Tanvir Hasan
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Senior DevOps Architect • Response within 24-48 hrs
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/60 px-2.5 py-1 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Active Evaluation
              </span>
            </div>
          </div>

          {/* Right 5 Cols: Submission Desk */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg" id="evaluation-desk">
            <form
              onSubmit={handleResubmit}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md"
            >
              <div className="p-space-sm rounded-xl bg-secondary-fixed/50 flex items-start gap-2.5">
                <Info
                  className="w-5 h-5 text-on-secondary-fixed shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="flex flex-col text-on-secondary-fixed">
                  <span className="font-label-md text-label-md font-semibold">
                    Current Revision: Revision #2
                  </span>
                  <span className="font-caption text-caption opacity-90">
                    Submitted Oct 28, 2024 at 09:45 PM BST. You can push updates before deadline.
                  </span>
                </div>
              </div>

              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Submission Desk
              </h2>

              {/* Repo Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="repo-url"
                  className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <Code2 className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
                    GitHub Repository URL <span className="text-error">*</span>
                  </span>
                  <span className="text-tertiary flex items-center gap-0.5 text-caption font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Public Repo
                  </span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="repo-url"
                    type="url"
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                    className="w-full bg-surface-container px-3.5 py-2.5 pr-20 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all font-mono"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open repository link"
                      className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyRepo}
                      aria-label="Copy repository URL"
                      className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      {copiedRepo ? (
                        <Check className="w-4 h-4 text-tertiary" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Demo URL */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="live-url"
                  className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
                    Live Deployed Production URL <span className="text-error">*</span>
                  </span>
                  <span className="text-tertiary flex items-center gap-0.5 text-caption font-medium">
                    <Lock className="w-3 h-3" aria-hidden="true" />
                    SSL Verified
                  </span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="live-url"
                    type="url"
                    value={liveUrl}
                    onChange={(event) => setLiveUrl(event.target.value)}
                    className="w-full bg-surface-container px-3.5 py-2.5 pr-10 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all font-mono"
                  />
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open live deployed application"
                    className="absolute right-2.5 p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="flex flex-col gap-1.5">
                <div className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Paperclip className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
                    Architecture Diagram &amp; Documentation (.PDF, .ZIP)
                  </span>
                  <span className="text-on-surface-variant font-caption text-caption">
                    Max: 50MB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary-container flex items-center justify-center shadow-sm mb-2 group-hover:scale-105 transition-transform">
                    <CloudUpload className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Click to upload or drag files here
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                    PDF or ZIP containing postman collection &amp; AWS topology
                  </p>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.zip"
                  onChange={handleFilePick}
                  className="hidden"
                />

                {attachment && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container mt-1 gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded bg-error/10 text-error flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                          {attachment.name}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          {attachment.meta}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => showToast(`Previewing ${attachment.name}`)}
                        aria-label="Preview PDF"
                        className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttachment(null)}
                        aria-label="Remove attachment"
                        className="p-1 rounded text-error hover:bg-error-container/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submission Notes */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="submission-notes"
                  className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
                    Submission Notes &amp; Testing Instructions
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    For Mentors
                  </span>
                </label>
                <textarea
                  id="submission-notes"
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full bg-surface-container p-3 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all font-mono leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-2 pt-space-xs">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-space-md rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:bg-primary transition-all"
                >
                  <Cloud className="w-4 h-4" aria-hidden="true" />
                  <span>Update &amp; Resubmit Assignment</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Downloading submitted archive v2 (UI preview).")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-space-md rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors"
                >
                  <Archive className="w-4 h-4" aria-hidden="true" />
                  <span>Download Submitted Archive (v2)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-caption text-caption">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <span>Draft state synced safely to cloud storage</span>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section: Evaluation Timeline */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Previous Submissions &amp; Mentor Evaluation History
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Track revisions, feedback logs, and progressive score improvements.
              </p>
            </div>
            <Link
              href="/live-class"
              className="flex items-center gap-2 px-space-md py-2 rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed hover:bg-tertiary-fixed/60 transition-colors self-start sm:self-auto"
            >
              <Headphones className="w-5 h-5 text-tertiary" aria-hidden="true" />
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-label-sm font-bold">
                  Daily Mentor Office Hours
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Live Q&amp;A today at 8:00 PM BST
                </span>
              </div>
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-col gap-space-md">
            {ASSIGNMENT_REVISIONS.map((rev) => (
              <div
                key={rev.id}
                className={`p-space-md rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-space-md ${
                  rev.score ? "bg-surface-container-lowest shadow-sm border border-surface-container" : "bg-surface-container-low"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold font-label-md ${
                      rev.statusTone === "secondary"
                        ? "bg-tertiary-fixed text-on-tertiary-fixed"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {rev.badge}
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        {rev.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-caption text-caption font-semibold">
                        {rev.date}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-caption text-caption font-semibold ${
                          rev.statusTone === "secondary"
                            ? "bg-secondary-container/50 text-on-secondary-container"
                            : "bg-tertiary-fixed text-on-tertiary-fixed"
                        }`}
                      >
                        {rev.status}
                      </span>
                    </div>
                    {rev.summary && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        {rev.summary}
                      </p>
                    )}
                    {rev.feedback && (
                      <div className="mt-1 p-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
                          <MessageSquare className="w-4 h-4" aria-hidden="true" />
                          <span>Mentor Review Note from {rev.mentor}:</span>
                        </div>
                        <p className="text-on-surface-variant italic">&ldquo;{rev.feedback}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>

                {rev.score ? (
                  <div className="flex items-center gap-space-md shrink-0 self-end md:self-center">
                    <div className="flex flex-col text-right">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Awarded Score
                      </span>
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                          {rev.score}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / 100
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Rubric breakdown: 24/30 Arch, 18/25 Docker, 20/25 Sec, 16/20 Docs.")}
                      className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>View Rubric</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-space-sm shrink-0 self-end md:self-center">
                    <div className="flex flex-col text-right">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Assigned Mentor
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                        {rev.mentor}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                      Pending Mark
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
