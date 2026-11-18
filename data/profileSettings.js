export const PROFILE_INITIAL_STATE = {
  fullNameEn: "Ariful Islam",
  displayNameBn: "আরিফুল ইসলাম",
  email: "ariful.islam@shikhbeshobai.com",
  phone: "1712-345678",
  headline: "Lead UI/UX & Web Design Instructor • 7+ Years Experience",
  bio: "Passionate educator teaching Figma design systems, modern frontend workflows, and mentoring the next generation of Bangladeshi designers for international remote careers.",
  linkedin: "https://linkedin.com/in/ariful-ux-mentor",
  github: "https://github.com/ariful-frontend",
  behance: "https://behance.net/arifuldesignlab",
  facebook: "https://facebook.com/ariful.shikhbeshobai",
  avatar: "/images/profile-1.jpg",
  coverImage: "/images/profile-cover.jpg",
  counselingAvailable: true,
};

export const PROFILE_INITIAL_DOMAINS = [
  { id: "dom-1", label: "UI/UX Design", primary: true },
  { id: "dom-2", label: "Figma Variables & Tokens", primary: true },
  { id: "dom-3", label: "Design Systems Architecture", primary: true },
  { id: "dom-4", label: "Frontend Basics (HTML/CSS)", primary: false },
];

export const PROFILE_SESSIONS = [
  {
    id: "sess-1",
    device: 'MacBook Pro 16" (Chrome 122)',
    type: "laptop",
    location: "Dhaka, Bangladesh",
    ip: "103.114.98.24",
    lastActive: "Right Now",
    current: true,
  },
  {
    id: "sess-2",
    device: "iPhone 14 Pro (LMS Mobile App)",
    type: "phone",
    location: "Mirpur, Dhaka",
    ip: "103.114.98.50",
    lastActive: "Yesterday, 10:14 PM",
    current: false,
  },
];

export const PROFILE_NOTIFICATION_CHANNELS = [
  {
    id: "notif-live",
    icon: "video",
    title: "Live Batch Class Reminders",
    description:
      "Receive automated prompts 15 minutes before Zoom / Google Meet classroom opens.",
    options: [
      { key: "email", label: "Email", defaultChecked: true },
      { key: "sms", label: "SMS / WhatsApp", defaultChecked: true },
    ],
  },
  {
    id: "notif-assignments",
    icon: "assignment",
    title: "Student Assignment Submissions",
    description:
      "Daily digest of Figma file submissions and milestone submissions ready for grading.",
    options: [
      { key: "email", label: "Email Digest", defaultChecked: true },
      { key: "push", label: "Instant App Push", defaultChecked: false },
    ],
  },
  {
    id: "notif-forum",
    icon: "forum",
    title: "Student Forum & Batch Q&A Alerts",
    description:
      "Notify when learners ask questions inside community discussions or tag @instructor.",
    options: [
      { key: "push", label: "Push Notification", defaultChecked: true },
      { key: "sms", label: "SMS", defaultChecked: false },
    ],
  },
  {
    id: "notif-dean",
    icon: "campaign",
    title: "Platform & Academic Dean Announcements",
    description:
      "Notices regarding holiday scheduling, curriculum updates, and payout cycles.",
    options: [
      { key: "email", label: "Email", defaultChecked: true },
      { key: "sms", label: "SMS", defaultChecked: true },
    ],
  },
];
