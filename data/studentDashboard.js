export const STUDENT_PROFILE = {
  fullName: "Tanvir Ahmed",
  roleLabel: "Student Learner",
  studentId: "ID: SS-84920",
  avatar: "/images/header-avatar.jpg",
  dateLabel: "Wednesday, 24 October 2024",
  academicWeek: "Academic Week 09",
  quote:
    "“ছোট ছোট অভ্যাসই বড় সাফল্যের কারিগর—Consistent coding builds unshakeable mastery.”",
};

export const STUDENT_SIDEBAR_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: "dashboard",
    href: "/student/dashboard",
    active: true,
  },
  {
    id: "my-courses",
    label: "My Courses",
    icon: "school",
    href: "#continue-learning",
  },
  {
    id: "browse-courses",
    label: "Browse Courses",
    icon: "explore",
    href: "/#featured-courses",
  },
  {
    id: "live-classes",
    label: "Live Classes",
    icon: "videocam",
    href: "#live-room",
  },
  {
    id: "class-recordings",
    label: "Class Recordings",
    icon: "play_lesson",
    href: "#continue-learning",
  },
  {
    id: "my-attendance",
    label: "My Attendance",
    icon: "attendance",
    href: "#kpi-overview",
  },
  {
    id: "my-progress",
    label: "My Progress",
    icon: "trending",
    href: "#weekly-activity",
  },
  {
    id: "assignments",
    label: "Assignments",
    icon: "assignment",
    href: "#assignments-desk",
  },
  {
    id: "quizzes",
    label: "Quizzes & Exams",
    icon: "quiz",
    href: "#assignments-desk",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: "certificate",
    href: "#kpi-overview",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: "wishlist",
    href: "/#featured-courses",
  },
  {
    id: "payments",
    label: "Payments & Orders",
    icon: "payments",
    href: "#kpi-overview",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
    href: "#announcements",
  },
  {
    id: "profile-settings",
    label: "Profile Settings",
    icon: "settings",
    href: "#welcome-bar",
  },
];

export const SECONDARY_COURSES = [
  {
    id: "uiux-figma",
    title: "UI/UX Figma System",
    nextLesson: "Next: Micro-interactions in Prototypes",
    progress: "85%",
    icon: "palette",
    iconColorClass: "text-secondary",
  },
  {
    id: "python-api",
    title: "Python Backend API",
    nextLesson: "Next: FastAPI Authentication Sockets",
    progress: "42%",
    icon: "terminal",
    iconColorClass: "text-tertiary",
  },
];

export const WEEKLY_STUDY_DATA = [
  {
    day: "Mon",
    hoursLabel: "2.2h",
    heightPercent: 55,
    barClass: "bg-secondary-fixed hover:bg-secondary",
    labelClass: "text-on-surface-variant",
    tooltipClass: "text-on-surface font-semibold",
  },
  {
    day: "Tue",
    hoursLabel: "3.5h",
    heightPercent: 87,
    barClass: "bg-primary-container",
    labelClass: "font-bold text-primary",
    tooltipClass: "text-on-surface font-semibold",
  },
  {
    day: "Wed",
    hoursLabel: "1.8h",
    heightPercent: 45,
    barClass: "bg-secondary-fixed hover:bg-secondary",
    labelClass: "text-on-surface-variant",
    tooltipClass: "text-on-surface font-semibold",
  },
  {
    day: "Thu",
    hoursLabel: "4.0h ★",
    heightPercent: 100,
    barClass: "bg-tertiary-container hover:bg-tertiary",
    labelClass: "text-on-surface-variant",
    tooltipClass: "text-tertiary font-bold",
  },
  {
    day: "Fri",
    hoursLabel: "2.8h",
    heightPercent: 70,
    barClass: "bg-secondary-fixed hover:bg-secondary",
    labelClass: "text-on-surface-variant",
    tooltipClass: "text-on-surface font-semibold",
  },
  {
    day: "Sat",
    hoursLabel: "1.5h",
    heightPercent: 37,
    barClass: "bg-surface-container-high",
    labelClass: "text-on-surface-variant",
    tooltipClass: "text-on-surface font-semibold",
  },
  {
    day: "Sun",
    hoursLabel: "2.6h",
    heightPercent: 65,
    barClass: "bg-secondary-fixed hover:bg-secondary",
    labelClass: "text-on-surface-variant",
    tooltipClass: "text-on-surface font-semibold",
  },
];

export const WEEKLY_HIGHLIGHTS = [
  {
    label: "Longest Focus Streak",
    value: "14 Days",
    valueClass: "text-primary",
  },
  {
    label: "GitHub Commits",
    value: "32 pushes",
    valueClass: "text-on-surface",
  },
  {
    label: "Quizzes Cleared",
    value: "4 / 4 Complete",
    valueClass: "text-tertiary",
  },
];

export const INSTRUCTOR_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    badge: "Notice",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
    timeAgo: "3 hours ago",
    title: "Next.js 14 App Router Resources Added",
    excerpt:
      "Assalamu Alaikum everyone, I have uploaded the clean boilerplate repository on GitHub along with the authentication middleware notes for tonight's session.",
    authorName: "Fahim Chowdhury",
    authorRole: "Lead Mentor",
    avatar: "/images/announcement-fahim.jpg",
    avatarAlt: "Avatar portrait of Fahim Chowdhury, Lead Mentor",
  },
  {
    id: "ann-2",
    badge: "Career Lab",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    timeAgo: "Yesterday",
    title: "Fiverr & Upwork Profile Review Workshop",
    excerpt:
      "Friday special session on freelancing portfolio presentation, proposal writing techniques, and overseas client communication etiquette.",
    authorName: "Sharmin Akter",
    authorRole: "Freelance Career Advisor",
    avatar: "/images/announcement-sharmin.jpg",
    avatarAlt: "Portrait of Sharmin Akter, Freelance Career Advisor",
  },
  {
    id: "ann-3",
    badge: "Office Hours",
    badgeClass: "bg-surface-container-high text-on-surface",
    timeAgo: "Oct 22, 2024",
    title: "Daily Support Desk Slot Reminder",
    excerpt:
      "Teaching assistants are available today from 4:00 PM to 7:00 PM in the Discord voice breakout rooms to help you unblock Redux Toolkit bugs.",
    authorName: "Nayeem Hasan",
    authorRole: "Teaching Assistant",
    avatar: "/images/announcement-nayeem.jpg",
    avatarAlt: "Portrait of Nayeem Hasan, Teaching Assistant",
  },
];
