export const LIVE_SESSION_META = {
  title: "Batch #SS-MERN-102: Masterclass on Microservices & Docker Deployment",
  languageBadge: "Bengali / English",
  mentorLine: "Lead Mentor: Engr. Tanvir Hasan (Senior Cloud Solutions Architect)",
  networkStatus: "HD • 24ms (Optimal)",
  mentorAvatar: "/images/live-class-1.jpg",
  repoUrl: "https://github.com/shikhbe-shobai/docker-mern-microservices-batch102",
  repoDisplay: "github.com/shikhbe-shobai/docker-mern-microservices-batch102",
};

export const LIVE_INITIAL_MESSAGES = [
  {
    id: "msg-1",
    sender: "Rafiqul Islam",
    role: "student",
    avatar: "/images/live-class-2.jpg",
    time: "01:14:10",
    text: "Bhaiya, will Docker Compose auto-restart on a DigitalOcean droplet if a node service crashes?",
  },
  {
    id: "msg-2",
    sender: "Fahmida Rahman (Teaching Assistant)",
    role: "ta",
    avatar: "/images/live-class-3.jpg",
    time: "01:15:02",
    text: "@Rafiqul Yes! If you configure restart: always or unless-stopped inside the compose file. Tanvir Bhai is about to showcase this now.",
  },
  {
    id: "msg-3",
    sender: "Farhana Akter",
    role: "student",
    avatar: "/images/live-class-4.jpg",
    time: "01:18:22",
    text: "আজকের সেশনটির রেকর্ডিং এবং প্রজেক্ট ফাইল কাল কয়টায় ড্যাশবোর্ডে আপলোড হবে?",
  },
  {
    id: "msg-4",
    sender: "Mahbub Alam",
    role: "student",
    avatar: "/images/live-class-5.jpg",
    time: "01:21:40",
    text: "Architecture diagram looks crystal clear! Love the explanation on multi-stage build cache invalidation. 🔥",
  },
];

export const LIVE_ROSTER_STUDENTS = [
  { id: "st-1", name: "Rafiqul Islam", handRaised: true, micOn: false },
  { id: "st-2", name: "Farhana Akter", handRaised: false, micOn: false },
  { id: "st-3", name: "Mahbub Alam", handRaised: false, micOn: false },
  { id: "st-4", name: "Nusrat Jahan", handRaised: false, micOn: false },
  { id: "st-5", name: "Sabbir Hossain", handRaised: false, micOn: false },
];

export const LIVE_POLL_DATA = {
  question: "Have you configured Docker Desktop on your local machine?",
  options: [
    { id: "opt-1", label: "Yes, running smoothly", votes: 111, barClass: "bg-primary-container", textClass: "text-primary-container" },
    { id: "opt-2", label: "Currently setting it up", votes: 23, barClass: "bg-secondary", textClass: "text-secondary" },
    { id: "opt-3", label: "Facing WSL2 / Virtualization errors", votes: 8, barClass: "bg-error", textClass: "text-error" },
  ],
};
