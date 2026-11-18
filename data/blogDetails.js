export const BLOG_ARTICLE = {
  category: "Career & Engineering",
  title: "The Complete 2025 Roadmap to Landing Remote Tech Jobs from Bangladesh",
  subtitle:
    "A pragmatic, engineer-tested playbook covering modern production stacks, asynchronous engineering visibility, international compensation negotiation, and compliant cross-border remittances.",
  publishedAt: "Oct 24, 2024",
  readTime: "8 min read",
  author: {
    name: "Tanvir Hasan",
    role: "Lead Full-Stack Mentor & Engineering Director",
    avatar: "/images/blog-detail-1.jpg",
    spotlightAvatar: "/images/blog-detail-3.jpg",
    ctaAvatar: "/images/blog-detail-4.jpg",
    bio: "10+ years building production cloud products for US & EU teams. Mentored 450+ Bangladeshi engineers into direct remote salaried roles.",
  },
  coverImage: "/images/blog-detail-2.jpg",
  coverCaption:
    "Focused asynchronous engineering setup: clarity in architecture documentation and pull request craftsmanship matter far more than timezone proximity.",
  tags: [
    "#RemoteWork2025",
    "#BangladeshTech",
    "#NextJS",
    "#CareerRoadmap",
    "#SystemDesign",
    "#GlobalEngineering",
  ],
  initialClaps: 248,
};

export const BLOG_TOC = [
  { id: "section-1", label: "1. The 2025 Remote Landscape" },
  { id: "section-2", label: "2. Core Technical Stack & Code Depth" },
  { id: "section-3", label: "3. Proof-of-Work Portfolio Checklist" },
  { id: "section-4", label: "4. Global vs Local Demand Metrics" },
  { id: "section-5", label: "5. Payment, Tax & Remittance Playbook" },
];

export const BLOG_CODE_SNIPPET = `import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/jwt";

export async function middleware(request) {
  const token = request.cookies.get("ss_session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = await verifySessionToken(token);
    const headers = new Headers(request.headers);
    headers.set("x-learner-role", payload.role);
    return NextResponse.next({ request: { headers } });
  } catch {
    return NextResponse.redirect(new URL("/login?expired=1", request.url));
  }
}`;

export const BLOG_PORTFOLIO_CHECKLIST = [
  {
    id: "chk-1",
    title: "Production-Deployed Full-Stack Flagship App",
    detail:
      "Live custom domain, realistic seed data, role-based authentication, and zero broken links—not a static YouTube clone.",
    defaultChecked: true,
  },
  {
    id: "chk-2",
    title: "Architecture Decision Records (ADRs) in README",
    detail:
      "Document why you chose PostgreSQL vs MongoDB, caching trade-offs, and system diagrams in Mermaid or Excalidraw.",
    defaultChecked: true,
  },
  {
    id: "chk-3",
    title: "Automated CI/CD & Meaningful Test Coverage",
    detail:
      "GitHub Actions running ESLint, integration checks, and clean preview deployments on every pull request.",
    defaultChecked: false,
  },
  {
    id: "chk-4",
    title: "2–3 Minute Loom Engineering Walkthroughs",
    detail:
      "Speak clearly in English explaining your architecture trade-offs—hiring managers love asynchronous communication proof.",
    defaultChecked: false,
  },
];

export const BLOG_RELATED_ARTICLES = [
  {
    id: "rel-1",
    category: "System Architecture",
    date: "Oct 18, 2024 • 9 min read",
    title: "Modular Monolith vs Microservices: What Early Startups Actually Hire For",
    excerpt:
      "Why mastering clean boundaries, database indexing, and observability beats over-engineered Kubernetes clusters in technical screens.",
    image: "/images/blog-detail-5.jpg",
    href: "/blog/details",
  },
  {
    id: "rel-2",
    category: "Career Strategy",
    date: "Oct 12, 2024 • 10 min read",
    title: "Freelancing vs Remote Full-Time: Which Path to Choose in 2025?",
    excerpt:
      "A comprehensive financial and stability comparison for Bangladeshi developers weighing Upwork gigs against structured full-time salaried contracts.",
    image: "/images/blog-detail-6.jpg",
    href: "/blog/details",
  },
  {
    id: "rel-3",
    category: "Interview Prep",
    date: "Oct 04, 2024 • 12 min read",
    title: "Top 10 System Design Questions Asked in Mid-Level Interviews",
    excerpt:
      "From designing a URL shortener to architecting real-time notifications with WebSockets and distributed queues.",
    image: "/images/blog-detail-7.jpg",
    href: "/blog/details",
  },
];
