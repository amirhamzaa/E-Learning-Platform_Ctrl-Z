export const ADMIN_MAIN_NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: "dashboard",
    href: "/admin/dashboard",
    active: true,
  },
  { id: "students", label: "Students", icon: "group", href: "#kpi-bento" },
  {
    id: "instructors",
    label: "Instructors",
    icon: "school",
    href: "#approval-queue",
  },
  { id: "courses", label: "Courses", icon: "menu_book", href: "#kpi-bento" },
  {
    id: "course-approvals",
    label: "Course Approvals",
    icon: "verified",
    href: "#approval-queue",
  },
  {
    id: "categories",
    label: "Categories",
    icon: "category",
    href: "#analytics-section",
  },
  {
    id: "live-classes",
    label: "Live Classes",
    icon: "videocam",
    href: "#system-feed",
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: "fact_check",
    href: "#analytics-section",
  },
  {
    id: "blog-management",
    label: "Blog Management",
    icon: "article",
    href: "#approval-queue",
  },
  {
    id: "quizzes-and-exams",
    label: "Quizzes & Exams",
    icon: "quiz",
    href: "#system-feed",
  },
  {
    id: "assignments",
    label: "Assignments",
    icon: "assignment",
    href: "#system-feed",
  },
  {
    id: "payments",
    label: "Payments",
    icon: "payments",
    href: "#orders-inflows",
  },
  {
    id: "orders-and-transactions",
    label: "Orders & Transactions",
    icon: "receipt_long",
    href: "#orders-inflows",
  },
  {
    id: "coupons-and-discounts",
    label: "Coupons & Discounts",
    icon: "loyalty",
    href: "#orders-inflows",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: "workspace_premium",
    href: "#kpi-bento",
  },
  {
    id: "reviews-and-reports",
    label: "Reviews & Reports",
    icon: "rate_review",
    href: "#system-feed",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "campaign",
    href: "#system-feed",
  },
];

export const ADMIN_SYSTEM_NAV_ITEMS = [
  {
    id: "website-settings",
    label: "Website Settings",
    icon: "tune",
    href: "#control-header",
  },
  {
    id: "profile-settings",
    label: "Profile Settings",
    icon: "manage_accounts",
    href: "#control-header",
  },
];

export const ENROLLMENT_LEGEND = [
  { label: "Web & Software Dev (42%)", colorClass: "bg-primary" },
  { label: "UI/UX & Product (28%)", colorClass: "bg-secondary" },
  { label: "Python & AI Tracks (18%)", colorClass: "bg-tertiary" },
  {
    label: "Freelancing & Marketing (12%)",
    colorClass: "bg-secondary-fixed-dim",
  },
];

export const MONTHLY_ENROLLMENT_BARS = [
  { label: "Jan", x: 50, h1: 130, h2: 90, h3: 55, h4: 25 },
  { label: "Feb", x: 120, h1: 145, h2: 105, h3: 65, h4: 32 },
  { label: "Mar", x: 190, h1: 155, h2: 120, h3: 75, h4: 40 },
  { label: "Apr", x: 260, h1: 140, h2: 105, h3: 60, h4: 28 },
  { label: "May", x: 330, h1: 162, h2: 125, h3: 80, h4: 45 },
  { label: "Jun", x: 400, h1: 172, h2: 135, h3: 88, h4: 52 },
  { label: "Jul (Now)", x: 470, h1: 182, h2: 148, h3: 100, h4: 60, peak: true },
  { label: "Aug*", x: 540, h1: 175, h2: 140, projected: true, opacity: 0.5 },
  { label: "Sep*", x: 610, h1: 185, h2: 150, projected: true, opacity: 0.4 },
];

export const PAYMENT_CHANNELS = [
  {
    id: "sslcommerz",
    name: "SSLCommerz (Cards/Bank)",
    percent: 64,
    amount: "৳1.18 Cr",
    dotClass: "bg-primary-container",
    barClass: "bg-primary-container",
  },
  {
    id: "bkash",
    name: "bKash Direct Merchant",
    percent: 24,
    amount: "৳44.2 L",
    dotClass: "bg-secondary",
    barClass: "bg-secondary",
  },
  {
    id: "stripe",
    name: "Stripe Global (NRI/Expat)",
    percent: 12,
    amount: "৳22.1 L",
    dotClass: "bg-tertiary",
    barClass: "bg-tertiary",
  },
];

export const APPROVAL_QUEUE_ITEMS = [
  {
    id: "app-1",
    type: "course",
    title: "Full Stack Next.js 14 & Go Backend",
    subtitle: "32 Modules • 4 Capstone Projects",
    icon: "code",
    iconWrapperClass: "bg-primary-container/10 text-primary-container",
    category: "Software Dev",
    submittedBy: "Tanvir Hasan",
    initials: "TH",
    avatarClass: "bg-secondary text-on-secondary",
    date: "Today, 10:45 AM",
    fee: "৳ 16,500",
    status: "Needs Review",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
    statusDotClass: "bg-secondary",
  },
  {
    id: "app-2",
    type: "course",
    title: "Generative AI for Product Designers",
    subtitle: "Midjourney, Figma, UI Heuristics",
    icon: "palette",
    iconWrapperClass: "bg-secondary/10 text-secondary",
    category: "UI/UX Design",
    submittedBy: "Farzana Chowdhury",
    initials: "FC",
    avatarClass: "bg-primary text-on-primary",
    date: "Yesterday",
    fee: "৳ 14,000",
    status: "Needs Review",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
    statusDotClass: "bg-secondary",
  },
  {
    id: "app-3",
    type: "instructor",
    title: "Senior DevOps & Kubernetes Lead",
    subtitle: "Lead Instructor Profile • NID & Tax Submitted",
    icon: "badge",
    iconWrapperClass: "bg-tertiary/10 text-tertiary",
    category: "Cloud & Infra",
    submittedBy: "Kazi Farhan",
    initials: "KF",
    avatarClass: "bg-tertiary text-on-tertiary",
    date: "2 days ago",
    fee: "N/A (Mentor)",
    status: "Pending KYC",
    statusClass: "bg-surface-container-high text-on-surface-variant",
    statusDotClass: "bg-outline",
  },
];

export const REALTIME_ORDERS = [
  {
    id: "TXN-88419208",
    gateway: "bKash",
    gatewayBadge: "bK",
    badgeClass: "bg-secondary-fixed/50 text-primary",
    studentName: "Mustafizur Rahman",
    course: "Full Stack MERN Cohort",
    amount: "৳ 12,000",
    timeAgo: "2 mins ago",
    status: "Successful",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    id: "TXN-88419194",
    gateway: "SSLCommerz",
    gatewayBadge: "SSL",
    badgeClass: "bg-primary-fixed/50 text-primary",
    studentName: "Sadia Afrin Sneha",
    course: "Advanced Figma & Design Systems",
    amount: "৳ 10,500",
    timeAgo: "18 mins ago",
    status: "Successful",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    id: "TXN-88419150",
    gateway: "Stripe",
    gatewayBadge: "STR",
    badgeClass: "bg-surface-container-high text-on-surface-variant",
    studentName: "Tariq Jamil (UK)",
    course: "Generative AI & LLM Engineering",
    amount: "৳ 24,000",
    timeAgo: "42 mins ago",
    status: "Successful",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    id: "TXN-88419098",
    gateway: "bKash",
    gatewayBadge: "bK",
    badgeClass: "bg-secondary-fixed/50 text-primary",
    studentName: "Mahmudul Hasan",
    course: "Professional UI/UX Masterclass",
    amount: "৳ 14,000",
    timeAgo: "1 hr ago",
    status: "Processing",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
  },
];

export const LIVE_SYSTEM_FEED = [
  {
    id: "feed-1",
    title: "Zoom Classroom Active",
    description:
      "Batch #SS-MERN-102 live session initialized by Engr. Tanvir.",
    timeAgo: "6 mins ago",
    dotBorderClass: "border-primary",
  },
  {
    id: "feed-2",
    title: "Merchant Settlement OK",
    description:
      "bKash automated transaction batch reconciliation synchronized.",
    timeAgo: "34 mins ago",
    dotBorderClass: "border-tertiary",
  },
  {
    id: "feed-3",
    title: "Rubric Evaluation",
    description:
      "Instructor Nusrat Jahan posted 48 graded assignment evaluations.",
    timeAgo: "1 hr ago",
    dotBorderClass: "border-secondary",
  },
  {
    id: "feed-4",
    title: "Security Audit Passed",
    description:
      "Nightly encrypted database cold snapshot successfully transferred to S3.",
    timeAgo: "3 hrs ago",
    dotBorderClass: "border-outline",
  },
];
