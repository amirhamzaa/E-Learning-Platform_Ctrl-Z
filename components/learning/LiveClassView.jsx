"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Check,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Hand,
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  PenTool,
  Pin,
  Send,
  SlidersHorizontal,
  Smile,
  Smartphone,
  Terminal,
  Timer,
  Users,
  Video,
  VideoOff,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LIVE_INITIAL_MESSAGES,
  LIVE_POLL_DATA,
  LIVE_ROSTER_STUDENTS,
  LIVE_SESSION_META,
} from "@/data/liveClass";
import { PortalShell } from "@/components/dashboard/PortalShell";

const EMOJI_REACTIONS = ["👏", "❤️", "🔥", "💡", "🚀"];

function formatSessionTimer(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, "0")).join(":");
}

export function LiveClassView() {
  const [elapsedSec, setElapsedSec] = useState(5058); // 01:24:18
  const [sidebarTab, setSidebarTab] = useState("chat");
  const [micMuted, setMicMuted] = useState(true);
  const [camOff, setCamOff] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
  const [flyingReactions, setFlyingReactions] = useState([]);
  const [messages, setMessages] = useState(LIVE_INITIAL_MESSAGES);
  const [chatText, setChatText] = useState("");
  const [pollOptions, setPollOptions] = useState(LIVE_POLL_DATA.options);
  const [selectedVote, setSelectedVote] = useState("opt-1");
  const [votingMode, setVotingMode] = useState(false);
  const [copiedRepo, setCopiedRepo] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerReaction = (emoji) => {
    const id = `${Date.now()}-${Math.random()}`;
    const left = 35 + Math.floor(Math.random() * 35);
    setFlyingReactions((prev) => [...prev, { id, emoji, left }]);
    setEmojiMenuOpen(false);
    setTimeout(() => {
      setFlyingReactions((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const trimmed = chatText.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: "You",
        role: "self",
        avatar: null,
        time: "Just now",
        text: trimmed,
      },
    ]);
    setChatText("");
  };

  const handleCopyRepo = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(LIVE_SESSION_META.repoUrl).catch(() => {});
    }
    setCopiedRepo(true);
    setTimeout(() => setCopiedRepo(false), 2000);
  };

  const handleVoteOption = (optionId) => {
    if (optionId === selectedVote) {
      setVotingMode(false);
      return;
    }
    setPollOptions((prev) =>
      prev.map((opt) => {
        if (opt.id === selectedVote) return { ...opt, votes: Math.max(0, opt.votes - 1) };
        if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
        return opt;
      })
    );
    setSelectedVote(optionId);
    setVotingMode(false);
  };

  const totalVotes = pollOptions.reduce((sum, item) => sum + item.votes, 0);

  return (
    <PortalShell activeRole="student" activeNav="live-classes">
      {/* Top Livestream Header Bar */}
      <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm px-space-md py-space-sm mb-space-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-bold uppercase tracking-wider shrink-0 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-error inline-block" />
            LIVE
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-space-xs flex-wrap">
              <h1 className="font-title-md text-title-md text-on-surface truncate">
                {LIVE_SESSION_META.title}
              </h1>
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption shrink-0">
                {LIVE_SESSION_META.languageBadge}
              </span>
            </div>
            <p className="font-caption text-caption text-secondary flex items-center gap-1.5 truncate mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{LIVE_SESSION_META.mentorLine}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
            <Wifi className="w-4 h-4 text-tertiary" aria-hidden="true" />
            <span>{LIVE_SESSION_META.networkStatus}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-title-md text-title-md">
            <Timer className="w-4 h-4 text-primary-container" aria-hidden="true" />
            <span className="font-mono font-semibold text-[14px]">
              {formatSessionTimer(elapsedSec)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLeaveModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-error-container/40 text-error hover:bg-error hover:text-on-error transition-all font-label-md text-label-md font-semibold"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Leave Class</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Split Stage */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md w-full items-start">
        {/* Left/Center Video Stage (8 Cols) */}
        <section className="xl:col-span-8 flex flex-col gap-space-md min-w-0">
          {/* Broadcast Screen Canvas */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-inverse-surface shadow-md group">
            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#1c1d1c] via-[#242724] to-[#151715]">
              <div className="w-full h-full p-5 md:p-8 flex flex-col justify-between select-none">
                <div className="flex items-center justify-between text-surface-container-highest/70 font-mono text-[11px] sm:text-[12px] pt-8 sm:pt-0">
                  <span className="flex items-center gap-1.5 truncate">
                    <MonitorUp
                      className="w-4 h-4 text-tertiary-fixed-dim shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {whiteboardOpen
                        ? "Shared Interactive Whiteboard Canvas Active"
                        : "Mentor Screen: VS Code & Docker Daemon Architecture"}
                    </span>
                  </span>
                  <span className="bg-surface/10 px-2 py-0.5 rounded text-surface shrink-0 ml-2">
                    1920x1080 @ 60fps
                  </span>
                </div>

                {/* Microservices Diagram Cards */}
                <div className="grid grid-cols-3 gap-3 md:gap-5 my-auto max-w-2xl mx-auto w-full">
                  <div className="p-3 md:p-3.5 rounded-lg bg-surface-container-lowest/10 backdrop-blur border-l-2 border-secondary flex flex-col items-center justify-center text-center">
                    <Smartphone className="w-6 h-6 text-secondary mb-1" aria-hidden="true" />
                    <span className="font-label-sm text-surface text-[11px] sm:text-[12px] font-semibold">
                      API Gateway
                    </span>
                    <span className="font-caption text-surface-container-highest/70 text-[10px]">
                      Nginx Reverse Proxy:80
                    </span>
                  </div>
                  <div className="p-3 md:p-3.5 rounded-lg bg-surface-container-lowest/10 backdrop-blur border-l-2 border-tertiary-fixed-dim flex flex-col items-center justify-center text-center">
                    <Cpu className="w-6 h-6 text-tertiary-fixed-dim mb-1" aria-hidden="true" />
                    <span className="font-label-sm text-surface text-[11px] sm:text-[12px] font-semibold">
                      Auth &amp; User Service
                    </span>
                    <span className="font-caption text-surface-container-highest/70 text-[10px]">
                      Node.js Express Pod (3)
                    </span>
                  </div>
                  <div className="p-3 md:p-3.5 rounded-lg bg-surface-container-lowest/10 backdrop-blur border-l-2 border-primary-fixed-dim flex flex-col items-center justify-center text-center">
                    <Database
                      className="w-6 h-6 text-primary-fixed-dim mb-1"
                      aria-hidden="true"
                    />
                    <span className="font-label-sm text-surface text-[11px] sm:text-[12px] font-semibold">
                      Replica Database
                    </span>
                    <span className="font-caption text-surface-container-highest/70 text-[10px]">
                      MongoDB Shard Cluster
                    </span>
                  </div>
                </div>

                <div className="bg-inverse-surface/90 rounded-lg p-2.5 font-mono text-[11px] text-tertiary-fixed flex items-center justify-between border-t border-surface/10 mb-14 sm:mb-12">
                  <span className="truncate">
                    $ docker-compose -f docker-compose.prod.yml up -d --scale user-service=3
                  </span>
                  <span className="text-surface-dim text-[10px] shrink-0 ml-2">
                    ✓ Containers healthy
                  </span>
                </div>
              </div>

              {/* Mentor PiP Webcam */}
              <div className="hidden sm:block absolute top-4 right-4 w-44 md:w-52 aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-2 ring-primary-container/40 z-20">
                <Image
                  src={LIVE_SESSION_META.mentorAvatar}
                  alt="Engr. Tanvir Hasan Host"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded bg-inverse-surface/85 backdrop-blur flex items-center justify-between text-inverse-on-surface">
                  <span className="font-label-sm text-[11px] font-medium truncate">
                    Engr. Tanvir Hasan (Host)
                  </span>
                  <Mic className="w-3.5 h-3.5 text-tertiary-fixed-dim shrink-0" aria-hidden="true" />
                </div>
              </div>

              {/* Top Left Recording Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-surface/80 backdrop-blur text-inverse-on-surface font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                <span className="font-medium tracking-wide">REC • Cloud 1080p</span>
              </div>
            </div>

            {/* Docked Floating Action Bar */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-2 rounded-2xl bg-inverse-surface/90 backdrop-blur-md shadow-2xl flex items-center gap-1.5 md:gap-2.5 max-w-[95%]">
              <button
                type="button"
                onClick={() => setMicMuted((prev) => !prev)}
                aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
                className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-colors ${
                  micMuted
                    ? "bg-error/25 text-error-container hover:bg-error/35"
                    : "bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface"
                }`}
              >
                {micMuted ? (
                  <MicOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Mic className="w-5 h-5" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setCamOff((prev) => !prev)}
                aria-label={camOff ? "Turn camera on" : "Turn camera off"}
                className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-colors ${
                  camOff
                    ? "bg-error/25 text-error-container hover:bg-error/35"
                    : "bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface"
                }`}
              >
                {camOff ? (
                  <VideoOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Video className="w-5 h-5" aria-hidden="true" />
                )}
              </button>

              <div className="h-6 w-px bg-surface-container-highest/30 mx-0.5" />

              <button
                type="button"
                onClick={() => setScreenSharing((prev) => !prev)}
                aria-label="Present screen"
                className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-colors ${
                  screenSharing
                    ? "bg-tertiary text-on-tertiary"
                    : "bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface"
                }`}
              >
                <MonitorUp className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setWhiteboardOpen((prev) => !prev)}
                aria-label="Toggle shared whiteboard"
                className={`hidden sm:flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${
                  whiteboardOpen
                    ? "bg-primary-container text-on-primary"
                    : "bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface"
                }`}
              >
                <PenTool className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setHandRaised((prev) => !prev)}
                aria-label="Raise hand"
                className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-colors ${
                  handRaised
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-highest/20 hover:bg-secondary text-inverse-on-surface"
                }`}
              >
                <Hand className="w-5 h-5" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 px-1.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-[10px] font-bold">
                  {handRaised ? 4 : 3}
                </span>
              </button>

              {/* Emoji Picker */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setEmojiMenuOpen((prev) => !prev)}
                  aria-label="Send reaction"
                  className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface transition-colors"
                >
                  <Smile className="w-5 h-5" aria-hidden="true" />
                </button>
                {emojiMenuOpen && (
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-2 rounded-xl bg-inverse-surface shadow-xl">
                    {EMOJI_REACTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => triggerReaction(emoji)}
                        className="hover:scale-125 transition-transform text-lg px-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-6 w-px bg-surface-container-highest/30 mx-0.5 hidden sm:block" />

              <button
                type="button"
                onClick={() => setSidebarTab("polls")}
                aria-label="Classroom controls"
                className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Flying Emoji Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
              {flyingReactions.map((r) => (
                <span
                  key={r.id}
                  className="absolute text-3xl animate-bounce"
                  style={{ left: `${r.left}%`, bottom: "18%" }}
                >
                  {r.emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Under-Video Info Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md w-full">
            <div className="md:col-span-2 p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-label-sm text-label-sm uppercase tracking-wide text-secondary font-semibold">
                    Active Syllabus Topic
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Module 07 of 14
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                  Docker Multi-Stage Builds &amp; Microservices Orchestration
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mb-3">
                  <CheckCircle2 className="w-4 h-4 text-tertiary" aria-hidden="true" />
                  <span>1. Multi-Stage Dockerfile optimizations</span>
                  <span className="text-outline">•</span>
                  <span className="text-primary-container font-semibold">
                    2. Live Docker Compose cluster setup
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Terminal className="w-4 h-4 text-primary-container shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[13px] text-on-surface truncate">
                    {LIVE_SESSION_META.repoDisplay}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyRepo}
                  className="shrink-0 px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-secondary transition-colors inline-flex items-center gap-1"
                >
                  {copiedRepo ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy Repo</span>
                  )}
                </button>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wide text-secondary font-semibold">
                  Live Q&amp;A Break
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg text-primary-container">
                    12:40
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    minutes remaining
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Mentors will address the top upvoted questions from the live Q&amp;A panel.
                </p>
              </div>
              <div className="pt-3">
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Interactive Sidebar (4 Cols) */}
        <aside className="xl:col-span-4 flex flex-col h-[700px] xl:h-[760px] rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-space-sm pt-space-sm pb-1 bg-surface-container-low shrink-0">
            <div className="flex items-center gap-1 w-full">
              <button
                type="button"
                onClick={() => setSidebarTab("chat")}
                className={
                  sidebarTab === "chat"
                    ? "flex-1 py-2 px-2 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold text-center shadow-sm transition-all flex items-center justify-center gap-1.5"
                    : "flex-1 py-2 px-2 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface text-center transition-all flex items-center justify-center gap-1.5"
                }
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Chat ({138 + messages.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("participants")}
                className={
                  sidebarTab === "participants"
                    ? "flex-1 py-2 px-2 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold text-center shadow-sm transition-all flex items-center justify-center gap-1.5"
                    : "flex-1 py-2 px-2 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface text-center transition-all flex items-center justify-center gap-1.5"
                }
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Roster (148)</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("polls")}
                className={
                  sidebarTab === "polls"
                    ? "flex-1 py-2 px-2 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold text-center shadow-sm transition-all flex items-center justify-center gap-1.5"
                    : "flex-1 py-2 px-2 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface text-center transition-all flex items-center justify-center gap-1.5"
                }
              >
                <BarChart3 className="w-4 h-4" aria-hidden="true" />
                <span>Polls (1)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: CHAT */}
          {sidebarTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="px-space-md py-2.5 bg-primary-fixed/30 flex items-start gap-2.5 shrink-0">
                <Pin className="w-4 h-4 text-primary-container shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[11px] font-bold text-primary-container uppercase">
                      Pinned by Moderator
                    </span>
                    <span className="font-caption text-caption text-secondary">10:15 PM</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface leading-snug">
                    Welcome everyone! Code repository link is pinned below the stream. Post
                    technical inquiries in the Q&amp;A tab for prioritized answers.
                  </p>
                </div>
              </div>

              <div className="flex-1 p-space-md overflow-y-auto flex flex-col gap-space-sm">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    {msg.avatar ? (
                      <Image
                        src={msg.avatar}
                        alt={msg.sender}
                        width={32}
                        height={32}
                        className={`w-8 h-8 rounded-full object-cover shrink-0 ${
                          msg.role === "ta" ? "ring-1 ring-secondary" : ""
                        }`}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold text-xs flex items-center justify-center shrink-0">
                        Me
                      </div>
                    )}
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-label-sm text-label-sm font-semibold ${
                            msg.role === "ta" ? "text-secondary" : "text-on-surface"
                          }`}
                        >
                          {msg.sender}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          {msg.time}
                        </span>
                      </div>
                      <p
                        className={`font-body-sm text-body-sm text-on-surface p-2 rounded-lg mt-0.5 ${
                          msg.role === "ta"
                            ? "bg-secondary-fixed/25"
                            : msg.role === "self"
                              ? "bg-surface-container"
                              : "bg-surface-container-low"
                        }`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-space-sm bg-surface-container-lowest shrink-0 border-t border-surface-container">
                <form
                  onSubmit={handleSendMessage}
                  className="flex flex-col gap-1.5 p-2 rounded-xl bg-surface-container-low"
                >
                  <input
                    type="text"
                    value={chatText}
                    onChange={(event) => setChatText(event.target.value)}
                    placeholder="Ask mentor or batchmates in English or বাংলা..."
                    aria-label="Send live class message"
                    className="w-full bg-transparent border-0 focus:outline-none font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant px-1"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <button
                        type="button"
                        onClick={() => setChatText((prev) => `${prev} \`docker compose up\` `)}
                        aria-label="Insert code snippet"
                        className="p-1 rounded hover:bg-surface-container"
                      >
                        <Code2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setChatText((prev) => `${prev} 🔥`)}
                        aria-label="Insert fire emoji"
                        className="p-1 rounded hover:bg-surface-container"
                      >
                        <Smile className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-secondary flex items-center gap-1 transition-colors"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: ROSTER */}
          {sidebarTab === "participants" && (
            <div className="flex-1 flex flex-col p-space-md overflow-y-auto">
              <div className="flex items-center justify-between mb-3 text-secondary font-label-sm text-label-sm">
                <span>Mentors &amp; Hosts (2)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                  <div>
                    <p className="font-label-sm text-label-sm font-semibold text-on-surface">
                      Engr. Tanvir Hasan
                    </p>
                    <p className="font-caption text-caption text-secondary">Host • Presenting</p>
                  </div>
                </div>
                <Mic className="w-4 h-4 text-tertiary" aria-hidden="true" />
              </div>

              <div className="flex items-center justify-between mb-2 mt-4 text-on-surface-variant font-label-sm text-label-sm">
                <span>Students Online (146)</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between p-2 rounded hover:bg-surface-container-low transition-colors">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    You (SS-84920)
                  </span>
                  <div className="flex items-center gap-1.5">
                    {handRaised && <Hand className="w-4 h-4 text-secondary" aria-hidden="true" />}
                    {micMuted ? (
                      <MicOff className="w-4 h-4 text-error" aria-hidden="true" />
                    ) : (
                      <Mic className="w-4 h-4 text-tertiary" aria-hidden="true" />
                    )}
                  </div>
                </div>
                {LIVE_ROSTER_STUDENTS.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-surface-container-low transition-colors"
                  >
                    <span className="font-body-sm text-body-sm text-on-surface">{st.name}</span>
                    <div className="flex items-center gap-1.5">
                      {st.handRaised && (
                        <Hand className="w-4 h-4 text-secondary" aria-hidden="true" />
                      )}
                      <MicOff className="w-4 h-4 text-error" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POLLS */}
          {sidebarTab === "polls" && (
            <div className="flex-1 flex flex-col p-space-md overflow-y-auto">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                    Active Poll
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {totalVotes} votes
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface">
                  {LIVE_POLL_DATA.question}
                </h3>

                <div className="flex flex-col gap-2.5 mt-1">
                  {pollOptions.map((opt) => {
                    const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    const isMine = selectedVote === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={!votingMode}
                        onClick={() => handleVoteOption(opt.id)}
                        className={`text-left p-2 rounded-lg transition-all ${
                          votingMode
                            ? "bg-surface-container-lowest hover:ring-2 hover:ring-primary-container cursor-pointer"
                            : ""
                        } ${isMine ? "ring-1 ring-primary-container/40" : ""}`}
                      >
                        <div className="flex items-center justify-between font-label-sm text-label-sm mb-1 text-on-surface">
                          <span>
                            {opt.label} {isMine ? "(Your Vote)" : ""}
                          </span>
                          <span className={`font-bold ${opt.textClass}`}>{pct}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high rounded-full h-2">
                          <div
                            className={`${opt.barClass} h-full rounded-full transition-all duration-300`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setVotingMode((prev) => !prev)}
                  className="mt-2 py-2 w-full rounded-lg bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors"
                >
                  {votingMode ? "Cancel Vote Change" : "Change My Vote"}
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Leave Class Confirmation Modal */}
      {leaveModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Leave Live Class Confirmation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/45 backdrop-blur-sm p-4"
        >
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-2xl max-w-md w-full">
            <div className="w-12 h-12 rounded-full bg-error-container/40 text-error flex items-center justify-center mb-space-sm">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Leave Live Class?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
              Your live attendance will be recorded up to this minute. You can re-join before the
              session concludes or watch the archive recording tomorrow.
            </p>
            <div className="flex items-center justify-end gap-space-sm">
              <button
                type="button"
                onClick={() => setLeaveModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Stay in Class
              </button>
              <Link
                href="/student/dashboard"
                className="px-4 py-2 rounded-lg bg-error text-on-error font-label-md text-label-md font-semibold hover:bg-error/90 transition-colors"
              >
                Confirm &amp; Exit
              </Link>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
