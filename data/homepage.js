export const SITE_ASSETS = {
  logo: "/images/bengali-learning-logo.png",
  headerAvatar: "/images/header-avatar.jpg",
  heroStudio: "/images/hero-studio.jpg",
};

export const NAV_LINKS = [
  { label: "Courses", href: "#featured-courses", plannedRoute: "/courses" },
  {
    label: "Upcoming Courses",
    href: "#upcoming-batches",
    plannedRoute: "/upcoming-courses",
  },
  { label: "Blog", href: "#latest-articles", plannedRoute: "/blog" },
  {
    label: "About Us",
    href: "#career-transformation",
    plannedRoute: "/about-us",
  },
  { label: "Contact", href: "#footer-contact", plannedRoute: "/contact" },
];

export const HERO_POPULAR_TAGS = [
  "Full-Stack Web Dev",
  "UI/UX Design",
  "Python & AI",
  "Digital Marketing",
];

export const IMPACT_STATS = [
  {
    value: "65,000+",
    label: "Graduated Students",
    sublabel: "Across all 64 districts",
    valueColorClass: "text-primary-fixed",
  },
  {
    value: "120+",
    label: "Industry Mentors",
    sublabel: "FAANG & Top Tech Leaders",
    valueColorClass: "text-tertiary-fixed",
  },
  {
    value: "850+",
    label: "Hiring Partners",
    sublabel: "Local & Global Software Firms",
    valueColorClass: "text-secondary-fixed",
  },
  {
    value: "৳ 4.5Cr+",
    label: "Freelancing Revenue",
    sublabel: "Direct student earnings verified",
    valueColorClass: "text-primary-fixed-dim",
  },
];

export const INDUSTRY_SECTORS = [
  {
    id: "web-development",
    title: "Web Development",
    courseCount: "28 Courses",
    icon: "terminal",
    href: "#featured-courses",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    courseCount: "16 Courses",
    icon: "design",
    href: "#featured-courses",
  },
  {
    id: "data-science-ai",
    title: "Data Science & AI",
    courseCount: "14 Courses",
    icon: "ai",
    href: "#featured-courses",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    courseCount: "22 Courses",
    icon: "marketing",
    href: "#featured-courses",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    courseCount: "19 Courses",
    icon: "graphic",
    href: "#featured-courses",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    courseCount: "11 Courses",
    icon: "security",
    href: "#upcoming-batches",
  },
];

export const COURSE_TRACK_FILTERS = [
  "All Tracks",
  "Development",
  "Design",
  "AI & Data",
];

export const FEATURED_COURSES = [
  {
    id: "course-1",
    slug: "full-stack-web-development-mern-nextjs",
    title: "Full-Stack Web Development with MERN & Next.js 14",
    track: "Development",
    duration: "6 Months • 48 Live Classes",
    instructorName: "Tanvir Hasan Sifat",
    instructorAvatar: "/images/instructor-tanvir.jpg",
    instructorAvatarAlt:
      "Portrait photo of Tanvir Hasan Sifat, Full-Stack Web Development instructor",
    thumbnail: "/images/course-fullstack.jpg",
    thumbnailAlt:
      "Modern laptop setup displaying TypeScript and React components alongside Node.js server terminal logs in a warm study studio",
    rating: "4.9",
    reviewsCount: "1,240 reviews",
    originalPrice: "৳ 18,000",
    price: "৳ 12,500",
    badges: [
      { label: "Bestseller", variant: "primary" },
      { label: "Live Mentorship", variant: "sage" },
    ],
  },
  {
    id: "course-2",
    slug: "professional-ui-ux-product-design-figma",
    title: "Professional UI/UX Product Design & Figma Design Systems",
    track: "Design",
    duration: "4 Months • 36 Live Classes",
    instructorName: "Nusrat Jahan Anika",
    instructorAvatar: "/images/instructor-nusrat.jpg",
    instructorAvatarAlt:
      "Portrait photo of Nusrat Jahan Anika, UI/UX Product Design lead instructor",
    thumbnail: "/images/course-uiux.jpg",
    thumbnailAlt:
      "High-fidelity UX design workflow showing wireframes, user journeys, and Figma component libraries in a warm studio",
    rating: "4.95",
    reviewsCount: "980 reviews",
    originalPrice: "৳ 16,000",
    price: "৳ 11,000",
    badges: [{ label: "Live Mentorship", variant: "sage" }],
  },
  {
    id: "course-3",
    slug: "python-machine-learning-applied-generative-ai",
    title: "Python, Machine Learning & Applied Generative AI",
    track: "AI & Data",
    duration: "5 Months • 40 Live Classes",
    instructorName: "Mahmudul Hasan",
    instructorAvatar: "/images/instructor-mahmudul.jpg",
    instructorAvatarAlt:
      "Portrait photo of Mahmudul Hasan, Data Science and AI instructor",
    thumbnail: "/images/course-python-ai.jpg",
    thumbnailAlt:
      "Neural network visualization, Python data analytics graphs, and prompt engineering code editor on workstation display",
    rating: "4.88",
    reviewsCount: "760 reviews",
    originalPrice: "৳ 20,000",
    price: "৳ 14,500",
    badges: [
      { label: "Hot Track", variant: "primary" },
      { label: "Live Mentorship", variant: "sage" },
    ],
  },
  {
    id: "course-4",
    slug: "advanced-digital-marketing-seo-advertising",
    title: "Advanced Digital Marketing, SEO & Performance Advertising",
    track: "Marketing",
    duration: "3.5 Months • 32 Live Classes",
    instructorName: "Rezaul Karim",
    instructorAvatar: "/images/instructor-rezaul.jpg",
    instructorAvatarAlt:
      "Portrait photo of Rezaul Karim, Digital Marketing strategist instructor",
    thumbnail: "/images/course-marketing.jpg",
    thumbnailAlt:
      "Digital marketing command dashboard with analytics charts, Meta ads campaign manager, and growth metrics on dual monitors",
    rating: "4.92",
    reviewsCount: "1,410 reviews",
    originalPrice: "৳ 14,000",
    price: "৳ 9,500",
    badges: [{ label: "Live Mentorship", variant: "sage" }],
  },
];

export const UPCOMING_BATCHES = [
  {
    id: "batch-ss-2408",
    batchCode: "Batch #SS-2408",
    startsIn: "Starts in 4 Days",
    badgeTone: "error",
    title: "Cyber Security & Ethical Hacking Masterclass",
    description:
      "Intensive live offensive security, network sniffing, and web vulnerability analysis lab.",
    schedule: "Sun & Wed, 8:00 PM",
    mode: "Live Zoom + Lab",
    filledSeats: 18,
    totalSeats: 25,
    progressColorClass: "bg-secondary",
    mentorName: "Kazi Farhan",
    mentorCredential: "CEH v12 Certified",
    mentorAvatar: "/images/batch-kazi.jpg",
    mentorAvatarAlt: "Portrait photo of Kazi Farhan, CEH v12 Certified mentor",
  },
  {
    id: "batch-ss-2409",
    batchCode: "Batch #SS-2409",
    startsIn: "Starts in 6 Days",
    badgeTone: "secondary",
    title: "App Development with Flutter & Dart 3",
    description:
      "Cross-platform iOS and Android enterprise architecture with riverpod and cloud APIs.",
    schedule: "Mon & Thu, 9:00 PM",
    mode: "Live Zoom + Github",
    filledSeats: 22,
    totalSeats: 25,
    progressColorClass: "bg-error",
    mentorName: "Saiful Islam",
    mentorCredential: "Lead Mobile Engineer",
    mentorAvatar: "/images/batch-saiful.jpg",
    mentorAvatarAlt: "Portrait photo of Saiful Islam, Lead Mobile Engineer mentor",
  },
  {
    id: "batch-ss-2410",
    batchCode: "Batch #SS-2410",
    startsIn: "Starts in 9 Days",
    badgeTone: "tertiary",
    title: "Motion Graphics & 3D Animation (After Effects + Blender)",
    description:
      "Commercial title animations, brand assets, and 3D product rendering studio workflow.",
    schedule: "Sat & Tue, 7:30 PM",
    mode: "Live Zoom + Project Sync",
    filledSeats: 15,
    totalSeats: 25,
    progressColorClass: "bg-tertiary-container",
    mentorName: "Arifur Rahman",
    mentorCredential: "3D Motion Director",
    mentorAvatar: "/images/batch-arifur.jpg",
    mentorAvatarAlt: "Portrait photo of Arifur Rahman, 3D Motion Director mentor",
  },
];

export const TRANSFORMATION_PILLARS = [
  {
    id: "lifetime-mentorship",
    badge: "Never Learn Alone",
    title: "Lifetime Mentorship Support",
    description:
      "Access our daily support lounge on Discord & Campus even years after course completion. Get real-time debugging assistance anytime.",
    icon: "support",
    iconWrapperClass: "bg-tertiary-fixed/30 text-tertiary",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    id: "live-batches",
    badge: "Real-Time Interaction",
    title: "Live Interactive Batches",
    description:
      "Strictly capped at 25 learners per cohort. Ask direct questions, participate in collaborative sprints, and build production projects together.",
    icon: "groups",
    iconWrapperClass: "bg-secondary-fixed/40 text-secondary",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
  },
  {
    id: "job-placement",
    badge: "Direct Employment",
    title: "Job Placement Cell",
    description:
      "Dedicated recruitment coordinators link high-performing alumni directly with 850+ partnering technology agencies in Dhaka and abroad.",
    icon: "handshake",
    iconWrapperClass: "bg-primary-fixed text-primary",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    id: "certified-curriculum",
    badge: "Global Standards",
    title: "Industry Certified Curriculum",
    description:
      "Our syllabus is updated every quarter following requirements from local tech giants, international marketplaces, and BTEB accreditation.",
    icon: "medal",
    iconWrapperClass: "bg-surface-container text-on-surface",
    badgeClass: "bg-surface-container-high text-on-surface",
  },
];

export const TOP_INSTRUCTORS = [
  {
    id: "shakil-ahmed",
    name: "Shakil Ahmed",
    role: "Head of Engineering",
    bio: "Ex-VP at Pathao, 12+ years building distributed cloud systems and scalable microservices.",
    studentsMentored: "14,000+ Students Mentored",
    avatar: "/images/mentor-shakil.jpg",
    avatarAlt: "Portrait photo of Shakil Ahmed, Head of Engineering",
  },
  {
    id: "farzana-chowdhury",
    name: "Farzana Chowdhury",
    role: "Principal Design Strategist",
    bio: "Advisory mentor at Google for Startups, specialized in human-centered AI interfaces.",
    studentsMentored: "9,200+ Students Mentored",
    avatar: "/images/mentor-farzana.jpg",
    avatarAlt: "Portrait photo of Farzana Chowdhury, Principal Design Strategist",
  },
  {
    id: "imtiaz-hossain",
    name: "Imtiaz Hossain",
    role: "Senior AI Researcher",
    bio: "Kaggle Grandmaster, contributing to open-source LLM fine-tuning for regional languages.",
    studentsMentored: "6,400+ Students Mentored",
    avatar: "/images/mentor-imtiaz.jpg",
    avatarAlt: "Portrait photo of Imtiaz Hossain, Senior AI Researcher",
  },
  {
    id: "sharmin-akter",
    name: "Sharmin Akter",
    role: "Global Freelance Consultant",
    bio: "Top-Rated Plus on Upwork with $400k+ earned in SEO & automated inbound sales funnels.",
    studentsMentored: "11,500+ Students Mentored",
    avatar: "/images/mentor-sharmin.jpg",
    avatarAlt: "Portrait photo of Sharmin Akter, Global Freelance Consultant",
  },
];

export const SUCCESS_STORIES = [
  {
    id: "zubair-al-mahmud",
    quote:
      "“I transitioned from a non-CS background to a Frontend Engineer role at a top Singapore remote agency within 8 months. The daily 1-on-1 code reviews made all the difference.”",
    studentName: "Zubair Al Mahmud",
    studentRole: "Frontend Engineer at WebSprout SG",
    avatar: "/images/student-zubair.jpg",
    avatarAlt: "Portrait photo of Zubair Al Mahmud, Frontend Engineer",
    rating: 5,
  },
  {
    id: "sumaiya-tasnim",
    quote:
      "“Shikhbe Shobai provided the exact bridge between textbook theory and practical client needs. In my first month after the course, I secured Top Rated badge on Upwork.”",
    studentName: "Sumaiya Tasnim",
    studentRole: "UI/UX Consultant & Top Rated Upwork",
    avatar: "/images/student-sumaiya.jpg",
    avatarAlt: "Portrait photo of Sumaiya Tasnim, UI/UX Consultant",
    rating: 5,
  },
  {
    id: "nafis-iqbal",
    quote:
      "“The physical campus support in Banani gave me access to high-end workstations and dedicated mentor hours. Their Job Placement team arranged 3 interviews right away.”",
    studentName: "Nafis Iqbal",
    studentRole: "Digital Marketer at Sheba.xyz",
    avatar: "/images/student-nafis.jpg",
    avatarAlt: "Portrait photo of Nafis Iqbal, Digital Marketer at Sheba.xyz",
    rating: 5,
  },
];

export const LATEST_ARTICLES = [
  {
    id: "tech-portfolio-remote-us-roles",
    slug: "high-converting-tech-portfolio-remote-us-roles",
    category: "Career Guide",
    readTime: "5 min read",
    title:
      "How to Build a High-Converting Tech Portfolio in Bangladesh for Remote US Roles",
    excerpt:
      "Explore the key metrics international engineering managers look for when hiring self-taught Bangladeshi developers.",
    thumbnail: "/images/blog-portfolio.jpg",
    thumbnailAlt:
      "Modern desktop setup with an open notebook, code on screen, coffee mug, and warm morning light in a Dhaka studio",
  },
  {
    id: "figma-variables-token-architecture",
    slug: "figma-variables-token-architecture",
    category: "Design Systems",
    readTime: "7 min read",
    title:
      "Figma Variables & Token Architecture: What Modern Product Designers Must Know",
    excerpt:
      "A complete breakdown of design tokens, multi-brand themes, and component governance for enterprise applications.",
    thumbnail: "/images/blog-figma.jpg",
    thumbnailAlt:
      "Close up of hands sketching user experience wireframes on paper alongside an iPad Pro running Figma in warm amber light",
  },
  {
    id: "local-llms-ollama-langchain",
    slug: "local-llms-ollama-langchain",
    category: "AI & Automation",
    readTime: "6 min read",
    title:
      "The Practical Developer’s Guide to Local LLMs with Ollama and LangChain",
    excerpt:
      "Run open-source intelligence on your workstation and create privacy-centric enterprise search assistants.",
    thumbnail: "/images/blog-llm.jpg",
    thumbnailAlt:
      "Abstract computational data visualization with soft green and amber glowing nodes representing artificial intelligence models",
  },
];

export const FOOTER_PLATFORM_LINKS = [
  { label: "All Courses", href: "#featured-courses", plannedRoute: "/courses" },
  {
    label: "Upcoming Batches",
    href: "#upcoming-batches",
    plannedRoute: "/upcoming-courses",
  },
  {
    label: "Student Portal",
    href: "#newsletter",
    plannedRoute: "/student/dashboard",
  },
  {
    label: "Mentor Program",
    href: "#instructors",
    plannedRoute: "/instructor/dashboard",
  },
];

export const FOOTER_INSTITUTION_LINKS = [
  {
    label: "About Us",
    href: "#career-transformation",
    plannedRoute: "/about-us",
  },
  { label: "Academic Journal", href: "#latest-articles", plannedRoute: "/blog" },
  {
    label: "Campus & Contact",
    href: "#footer-contact",
    plannedRoute: "/contact",
  },
  {
    label: "Terms & Trust",
    href: "#footer-legal",
    plannedRoute: "/terms-of-service",
  },
];

export const FOOTER_LEGAL_LINKS = [
  {
    label: "Privacy Policy",
    href: "#footer-legal",
    plannedRoute: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    href: "#footer-legal",
    plannedRoute: "/terms-of-service",
  },
  {
    label: "Academic Code of Conduct",
    href: "#footer-legal",
    plannedRoute: "/code-of-conduct",
  },
];
