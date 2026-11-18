export const CATALOG_CATEGORIES = [
  { id: "all", label: "All Categories", count: 42 },
  { id: "Web Development", label: "Web Development", count: 12 },
  { id: "UI/UX Design", label: "UI/UX Design", count: 8 },
  { id: "Digital Marketing", label: "Digital Marketing", count: 6 },
  { id: "Data Science", label: "Data Science & AI", count: 5 },
  { id: "Freelancing", label: "Freelancing & Career", count: 6 },
  { id: "Mobile Apps", label: "Mobile Apps", count: 5 },
];

export const CATALOG_PRICE_FILTERS = [
  { id: "all", label: "All Programs" },
  { id: "paid", label: "Paid Programs" },
  { id: "free", label: "Free Workshops" },
];

export const CATALOG_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const CATALOG_MODES = [
  { id: "Live Batch", label: "Live Interactive Batch" },
  { id: "Recorded", label: "Self-Paced Recorded" },
];

export const CATALOG_RATINGS = [
  { value: 4.5, label: "4.5 & up" },
  { value: 4.0, label: "4.0 & up" },
  { value: 0, label: "All ratings" },
];

export const CATALOG_INSTRUCTORS = [
  "Tanvir Hasan",
  "Nusrat Jahan",
  "Dr. Farhan Ahmed",
  "Rakibul Islam",
  "Sayed Al-Amin",
  "Shovon Saha",
];

export const CATALOG_SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest Batches" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export const CATALOG_COURSES = [
  {
    id: "mern-nextjs-mastery",
    title: "Full-Stack MERN & Next.js Mastery",
    description:
      "Architect scalable web applications using React 19, Next.js App Router, Express, MongoDB, and cloud CI/CD pipelines.",
    category: "Web Development",
    level: "Intermediate",
    mode: "Live Batch",
    modeBadge: "Live Batch",
    duration: "6 Months",
    rating: 4.9,
    reviewsCount: "410",
    popularity: 99,
    batchOrder: 6,
    price: 12000,
    priceFormatted: "৳ 12,000",
    originalPriceFormatted: "৳ 18,000",
    isFree: false,
    thumbnail: "/images/catalog-1.jpg",
    instructor: {
      name: "Tanvir Hasan",
      role: "Lead Full-Stack Engineer",
      avatar: "/images/catalog-2.jpg",
    },
    href: "/course-details",
  },
  {
    id: "ui-ux-design-systems",
    title: "UI/UX Design Systems & Prototyping",
    description:
      "Master user research, accessibility principles, scalable component tokens in Figma, and micro-interaction prototyping.",
    category: "UI/UX Design",
    level: "Beginner",
    mode: "Live Batch",
    modeBadge: "Live Batch",
    duration: "4 Months",
    rating: 4.8,
    reviewsCount: "285",
    popularity: 92,
    batchOrder: 5,
    price: 9500,
    priceFormatted: "৳ 9,500",
    originalPriceFormatted: "৳ 14,000",
    isFree: false,
    thumbnail: "/images/catalog-3.jpg",
    instructor: {
      name: "Nusrat Jahan",
      role: "Principal Product Designer",
      avatar: "/images/catalog-4.jpg",
    },
    href: "/course-details",
  },
  {
    id: "python-ai-ml-bootcamp",
    title: "Python for Data Science, AI & Machine Learning",
    description:
      "Build real-world predictive models, neural networks, and LLM pipelines with Pandas, Scikit-Learn, and PyTorch.",
    category: "Data Science",
    level: "Advanced",
    mode: "Live Batch",
    modeBadge: "Live Batch",
    duration: "6 Months",
    rating: 4.9,
    reviewsCount: "194",
    popularity: 95,
    batchOrder: 4,
    price: 14500,
    priceFormatted: "৳ 14,500",
    originalPriceFormatted: "৳ 20,000",
    isFree: false,
    thumbnail: "/images/catalog-5.jpg",
    instructor: {
      name: "Dr. Farhan Ahmed",
      role: "Senior AI Scientist",
      avatar: "/images/catalog-6.jpg",
    },
    href: "/course-details",
  },
  {
    id: "flutter-mobile-engineering",
    title: "Cross-Platform Mobile Apps with Flutter & Dart",
    description:
      "Design and publish responsive iOS & Android apps with clean state management, Firebase authentication, and REST APIs.",
    category: "Mobile Apps",
    level: "Intermediate",
    mode: "Recorded",
    modeBadge: "Self-Paced",
    duration: "5 Months",
    rating: 4.7,
    reviewsCount: "162",
    popularity: 84,
    batchOrder: 3,
    price: 8500,
    priceFormatted: "৳ 8,500",
    originalPriceFormatted: "৳ 12,000",
    isFree: false,
    thumbnail: "/images/catalog-7.jpg",
    instructor: {
      name: "Rakibul Islam",
      role: "Staff Mobile Engineer",
      avatar: "/images/catalog-8.jpg",
    },
    href: "/course-details",
  },
  {
    id: "digital-marketing-performance",
    title: "Performance Marketing, SEO & Growth Analytics",
    description:
      "Scale businesses using conversion rate optimization, Meta & Google Ads funnels, GA4 telemetry, and technical SEO audits.",
    category: "Digital Marketing",
    level: "Beginner",
    mode: "Live Batch",
    modeBadge: "Live Batch",
    duration: "3 Months",
    rating: 4.8,
    reviewsCount: "312",
    popularity: 90,
    batchOrder: 2,
    price: 6500,
    priceFormatted: "৳ 6,500",
    originalPriceFormatted: "৳ 10,000",
    isFree: false,
    thumbnail: "/images/catalog-9.jpg",
    instructor: {
      name: "Sayed Al-Amin",
      role: "Head of Growth",
      avatar: "/images/catalog-10.jpg",
    },
    href: "/course-details",
  },
  {
    id: "freelancing-remote-career-launchpad",
    title: "Global Freelancing & Remote Career Launchpad",
    description:
      "Learn high-converting client proposals, international portfolio positioning, rate negotiations, and payment setup.",
    category: "Freelancing",
    level: "Beginner",
    mode: "Recorded",
    modeBadge: "Free Workshop",
    duration: "4 Weeks",
    rating: 4.9,
    reviewsCount: "640",
    popularity: 97,
    batchOrder: 1,
    price: 0,
    priceFormatted: "Free",
    originalPriceFormatted: "৳ 3,000",
    isFree: true,
    thumbnail: "/images/catalog-11.jpg",
    instructor: {
      name: "Shovon Saha",
      role: "Top Rated Plus Strategist",
      avatar: "/images/catalog-12.jpg",
    },
    href: "/course-details",
  },
];
