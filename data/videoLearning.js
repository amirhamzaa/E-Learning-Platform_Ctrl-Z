export const VIDEO_LESSON_INFO = {
  courseTitle: "Full Stack MERN & Next.js",
  moduleTitle: "Module 4: Auth & Security",
  lessonCode: "Lesson 4.2",
  lessonTitle: "Lesson 4.2: Implementing JWT & Refresh Token Rotation with HttpOnly Cookies",
  shortTitle: "Lesson 4.2: Implementing JWT & Refresh Tokens",
  completedLessons: 34,
  totalLessons: 50,
  studentAvatar: "/images/video-learn-2.jpg",
  videoBackground: "/images/video-learn-screen.jpg",
  durationSeconds: 1730, // 28:50
  initialSeconds: 865, // 14:25
  instructor: {
    name: "Engr. Tanvir Hasan",
    badge: "Lead Instructor",
    subtitle: "Senior Cloud & Next.js Architect • Updated 3 days ago",
    avatar: "/images/video-learn-3.jpg",
  },
  overviewHeading: "Understanding JWTs & HttpOnly Cookie Security Pattern",
  overviewBody:
    "In this core lesson, we dive deep into resilient authentication architectures for Next.js 14 and Node.js microservices. Rather than storing volatile JWT tokens in browser LocalStorage or SessionStorage—which leaves client applications vulnerable to Cross-Site Scripting (XSS)—we configure cryptographically signed, stateless access tokens alongside long-lived refresh tokens stored exclusively in strictly partitioned HttpOnly; Secure; SameSite=Lax cookies.",
  takeaways: [
    {
      icon: "shield",
      tone: "text-primary",
      title: "Zero XSS Vulnerability",
      description:
        "Prevent client JavaScript context access to sensitive authentication state credentials.",
    },
    {
      icon: "sync",
      tone: "text-tertiary",
      title: "Silent Rotation",
      description:
        "Axios response interceptor automatically captures 401s and requests fresh 15-minute access tokens.",
    },
    {
      icon: "key",
      tone: "text-secondary",
      title: "Stateless Verification",
      description:
        "Utilize RS256 asymmetric cryptographic keys for lightning-fast Edge API verification.",
    },
  ],
  codeSnippet: `import { NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken } from '@/lib/jwt';

export async function POST(req) {
  // Extract protected HttpOnly cookie securely
  const refreshToken = req.cookies.get('refreshToken')?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await verifyRefreshToken(refreshToken);
    const newAccessToken = signAccessToken({ userId: decoded.sub, role: decoded.role });

    return NextResponse.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token rotation signature' }, { status: 403 });
  }
}`,
};

export const VIDEO_RESOURCES = [
  {
    id: "res-1",
    name: "auth-starter-repo.zip",
    meta: "Source code • 4.2 MB",
    cta: "Download Zip",
    icon: "zip",
    bgClass: "bg-primary-container text-on-primary",
  },
  {
    id: "res-2",
    name: "JWT-Architecture.pdf",
    meta: "Diagram cheat-sheet • 1.8 MB",
    cta: "Download PDF",
    icon: "pdf",
    bgClass: "bg-secondary text-on-secondary",
  },
  {
    id: "res-3",
    name: "Postman-Collection-v2.json",
    meta: "API Tests • 320 KB",
    cta: "Download JSON",
    icon: "json",
    bgClass: "bg-tertiary text-on-tertiary",
  },
];

export const VIDEO_INITIAL_DISCUSSIONS = [
  {
    id: "disc-1",
    author: "Arifur Rahman",
    avatar: "/images/video-learn-4.jpg",
    timeAgo: "Asked 4 hours ago",
    upvotes: 14,
    question:
      "Why should we separate Access Tokens and Refresh Tokens? Can't we simply keep a 7-day JWT inside the HttpOnly cookie?",
    reply: {
      author: "Engr. Tanvir Hasan",
      badge: "Instructor Verified",
      text: "Great question Arifur! Long-lived tokens cannot be revoked immediately if a user's machine is compromised or permission levels change. A short-lived 15-minute Access Token minimizes risk, while the Refresh Token resides securely behind strict server-side validation checks.",
    },
  },
];

export const VIDEO_CURRICULUM_MODULES = [
  {
    id: "m1",
    title: "Module 1: Setup & App Router",
    meta: "5 / 5 Completed • 1h 20m",
    status: "completed",
    lessons: [
      { id: "l-1-1", title: "1.1 Introduction to Next.js 14 Paradigm", duration: "12m", status: "completed" },
      { id: "l-1-2", title: "1.2 App Router Layouts & Nested Segments", duration: "19m", status: "completed" },
    ],
  },
  {
    id: "m2",
    title: "Module 2: Server Actions & Prisma",
    meta: "8 / 8 Completed • 2h 45m",
    status: "completed",
    lessons: [
      { id: "l-2-1", title: "2.1 Postgres Schema Design with Prisma", duration: "24m", status: "completed" },
      { id: "l-2-2", title: "2.2 Optimistic Mutations with Server Actions", duration: "22m", status: "completed" },
    ],
  },
  {
    id: "m3",
    title: "Module 3: State with Zustand",
    meta: "6 / 6 Completed • 1h 50m",
    status: "completed",
    lessons: [
      { id: "l-3-1", title: "3.1 Global Stores & Hydration Guards", duration: "18m", status: "completed" },
    ],
  },
  {
    id: "m4",
    title: "Module 4: Authentication & Security",
    meta: "2 of 6 Lessons Completed (33%)",
    status: "active",
    lessons: [
      { id: "l-4-1", title: "4.1 Password Hashing with Bcrypt", duration: "18 min", status: "completed" },
      { id: "l-4-2", title: "4.2 Implementing JWT & Refresh Tokens", duration: "28 min", status: "playing" },
      { id: "l-4-3", title: "4.3 NextAuth.js v5 Integration", duration: "32 min", status: "locked" },
      { id: "l-4-4", title: "4.4 Role-Based Access Control (RBAC)", duration: "24 min", status: "locked" },
      { id: "q-4", title: "Quiz 4: Security & Auth Best Practices", duration: "15 Qs", status: "quiz" },
    ],
  },
  {
    id: "m5",
    title: "Module 5: Payment Gateway & Deployment",
    meta: "8 Lessons • Unlocks after Module 4",
    status: "locked",
    lessons: [],
  },
];
