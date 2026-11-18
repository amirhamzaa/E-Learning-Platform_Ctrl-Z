export const COURSE_DETAIL_HERO = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Web Development", href: "/courses" },
    { label: "Full-Stack MERN Stack & Next.js Mastery", href: null },
  ],
  badges: [
    { label: "Bestseller Batch", tone: "secondary" },
    { label: "Live Interactive", tone: "tertiary" },
    { label: "Cohort #14 Enrolling", tone: "neutral" },
  ],
  title: "Full-Stack MERN Stack & Next.js Mastery: From Fundamentals to Production",
  subtitle:
    "Architect modern, enterprise-grade full-stack applications using React 19, Next.js App Router, Node.js, Express, and MongoDB with dedicated code reviews and live mentorship.",
  rating: "4.9",
  reviewsLabel: "(1,240 ratings)",
  duration: "24 Weeks • Live + Guided Lab",
  language: "Bengali & English Technical Terms",
  mentor: {
    name: "Engr. Tanvir Hasan",
    role: "Lead Mentor • Senior Principal Engineer (10+ Years Experience)",
    avatar: "/images/course-detail-1.jpg",
  },
};

export const COURSE_COMPETENCIES = [
  "Master modern JavaScript (ES6+), TypeScript fundamentals, and asynchronous patterns for resilient web engineering.",
  "Build dynamic, server-rendered applications with React 19 and Next.js App Router utilizing Server Actions.",
  "Design clean, scalable REST & GraphQL APIs with Node.js, Express.js, JWT Auth, and Role-Based Access Control.",
  "Architect efficient NoSQL database schemas, aggregation pipelines, and indexing strategies in MongoDB Atlas.",
  "Implement real-time bidirectional systems using Socket.io, Redis caching, and background worker queues.",
  "Write clean Tailwind CSS interfaces, design systems, and WCAG-compliant accessible frontend components.",
  "Integrate payment gateways (SSLCommerz & Stripe) with automated webhooks and transactional email workflows.",
  "Deploy zero-downtime containerized applications via Docker, GitHub Actions CI/CD, Vercel, and AWS EC2.",
];

export const COURSE_PREREQUISITES = [
  "Basic familiarity with computer operations, internet browsing, and strong commitment to learn.",
  "Foundational awareness of HTML/CSS is helpful but not mandatory (covered in Module 1 Foundation Bridge).",
  "A personal laptop/PC with at least 8GB RAM and a stable broadband internet connection for live coding labs.",
];

export const COURSE_CURRICULUM = [
  {
    id: "mod-1",
    number: "01",
    title: "Modern Frontend Engineering, HTML5, Tailwind & JS Essentials",
    meta: "4 Weeks • 16 Live Sessions • 2 Projects",
    lessons: [
      {
        title: "Semantic Architecture, Flexbox/Grid Layouts & Responsive Breakpoints",
        duration: "01:45:00",
        isPreview: true,
        type: "video",
      },
      {
        title: "Deep Dive into ES6+, Closures, Event Loop & Async/Await Patterns",
        duration: "02:10:00",
        isPreview: false,
        type: "video",
      },
      {
        title: "Module 1 Capstone: Responsive SaaS Landing Page & Interactive Pricing Engine",
        duration: "Lab Assignment",
        isPreview: false,
        type: "lab",
      },
    ],
  },
  {
    id: "mod-2",
    number: "02",
    title: "React 19 Core Architecture, Custom Hooks & State Management",
    meta: "5 Weeks • 20 Live Sessions • 3 Projects",
    lessons: [
      {
        title: "Component Lifecycle, Reconciliation & React Compiler Optimizations",
        duration: "02:05:00",
        isPreview: true,
        type: "video",
      },
      {
        title: "Zustand, Redux Toolkit & TanStack Query for Resilient Async Server State",
        duration: "02:30:00",
        isPreview: false,
        type: "video",
      },
      {
        title: "Module 2 Capstone: Multi-Tenant Kanban Board with Drag-and-Drop Persistence",
        duration: "Lab Assignment",
        isPreview: false,
        type: "lab",
      },
    ],
  },
  {
    id: "mod-3",
    number: "03",
    title: "Backend Mastery with Node.js, Express, MongoDB & Security",
    meta: "6 Weeks • 24 Live Sessions • 3 Projects",
    lessons: [
      {
        title: "RESTful API Architecture, Error Handling & Zod Schema Validation",
        duration: "02:15:00",
        isPreview: false,
        type: "video",
      },
      {
        title: "JWT + HttpOnly Refresh Token Rotation, RBAC & Rate Limiting Defense",
        duration: "02:20:00",
        isPreview: false,
        type: "video",
      },
      {
        title: "MongoDB Aggregation Pipelines, Compound Indexes & Transaction Safety",
        duration: "02:00:00",
        isPreview: false,
        type: "video",
      },
    ],
  },
  {
    id: "mod-4",
    number: "04",
    title: "Next.js Full-Stack App Router, Server Actions & SSR Caching",
    meta: "5 Weeks • 20 Live Sessions • 2 Projects",
    lessons: [
      {
        title: "React Server Components, Streaming Suspense & Incremental Static Regeneration",
        duration: "02:10:00",
        isPreview: false,
        type: "video",
      },
      {
        title: "Building Secure E-Commerce Checkout with SSLCommerz & Stripe Webhooks",
        duration: "02:25:00",
        isPreview: false,
        type: "video",
      },
    ],
  },
  {
    id: "mod-5",
    number: "05",
    title: "Cloud Deployment, Docker, CI/CD & Production Capstone Defense",
    meta: "4 Weeks • 16 Live Sessions • Career Prep",
    lessons: [
      {
        title: "Multi-Stage Dockerfiles, Nginx Reverse Proxy & AWS EC2 Zero-Downtime Deploy",
        duration: "02:30:00",
        isPreview: false,
        type: "video",
      },
      {
        title: "Final Capstone Jury Defense, GitHub Portfolio Audit & Mock Technical Interviews",
        duration: "Final Evaluation",
        isPreview: false,
        type: "lab",
      },
    ],
  },
];

export const COURSE_MENTOR = {
  name: "Engr. Tanvir Hasan",
  role: "Principal Software Architect & Academic Director at Shikhbe Shobai",
  avatar: "/images/course-detail-2.jpg",
  bio: "With over 10 years architecting high-traffic FinTech and SaaS platforms for startups across Europe and Southeast Asia, Tanvir specializes in demystifying distributed systems and full-stack engineering. He has mentored 14,000+ Bangladeshi learners into remote engineering careers.",
  stats: [
    { value: "14,000+", label: "Students Mentored" },
    { value: "4.9 / 5", label: "Mentor Rating" },
    { value: "42", label: "Cohorts Led" },
  ],
};

export const COURSE_REVIEWS_SUMMARY = {
  average: "4.9",
  totalLabel: "Based on 1,240 verified reviews",
  distribution: [
    { stars: 5, percent: 86 },
    { stars: 4, percent: 11 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Maliha Tabassum",
      role: "Junior Full-Stack Engineer • Batch #11 Alumni",
      avatar: "/images/course-detail-3.jpg",
      rating: 5,
      date: "2 weeks ago",
      text: "The live code reviews changed how I write software completely. Instead of just watching tutorial clones, Tanvir bhaiya pushed us to structure real Next.js APIs with proper authentication and deployment pipelines. I landed my first remote role within 6 weeks of graduating.",
    },
    {
      id: "rev-2",
      author: "Sajjadul Karim",
      role: "Frontend Specialist • Batch #12 Alumni",
      avatar: "/images/course-detail-4.jpg",
      rating: 5,
      date: "1 month ago",
      text: "Every single module builds directly toward production standards. The Discord mentorship desk answered my Docker and MongoDB aggregation questions even late at night. Easily the highest-ROI engineering track available in Bangladesh.",
    },
  ],
};

export const COURSE_RELATED = [
  {
    id: "rel-uiux",
    category: "UI/UX Design",
    title: "Design Systems Engineering & Advanced Figma Architecture",
    duration: "16 Weeks • Live",
    rating: "4.8",
    price: "৳ 9,500",
    image: "/images/course-detail-5.jpg",
    href: "/courses",
  },
  {
    id: "rel-devops",
    category: "Cloud & DevOps",
    title: "Production Docker, Kubernetes & AWS Cloud Architecture",
    duration: "14 Weeks • Live",
    rating: "4.9",
    price: "৳ 11,000",
    image: "/images/course-detail-6.jpg",
    href: "/courses",
  },
];

export const COURSE_SIDEBAR = {
  previewThumb: "/images/course-detail-7.jpg",
  price: "৳ 14,500",
  originalPrice: "৳ 22,000",
  discountBadge: "34% OFF",
  urgencyTitle: "Cohort #14 Enrolling Fast",
  urgencySubtitle: "Only 7 seats left • Orientation starts 15th Oct",
  specs: [
    { icon: "calendar", label: "Duration", value: "24 Weeks Live" },
    { icon: "clock", label: "Live Instruction", value: "96+ Hours" },
    { icon: "code", label: "Portfolio Output", value: "12 Capstone Projects" },
    { icon: "video", label: "Recordings", value: "Lifetime 1080p Access" },
    { icon: "award", label: "Credential", value: "Verified Certificate" },
    { icon: "support", label: "Mentorship", value: "24/7 Discord Support Desk" },
  ],
};
