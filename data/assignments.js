export const ASSIGNMENT_HEADER = {
  breadcrumb: ["Dashboard", "Assignments", "Assignment #05: Microservices Architecture"],
  dueLabel: "Due: Nov 05, 2024 • 11:59 PM BST",
  statusLabel: "Submitted - Under Review",
  moduleMeta: "Module 08 • Full Stack Production Engineering",
  title:
    "Assignment #05: Multi-Container Microservices Deployment with Docker Compose & Nginx",
  description:
    "Build and containerize a 3-tier MERN stack application with Nginx reverse proxy, automated MongoDB replica set initialization, and CI/CD GitHub Actions workflow.",
  weightage: "Weightage: 15%",
  briefText:
    "In this capstone deployment exercise, you will transform standard monolithic and separate micro-repositories into an enterprise-ready, containerized pipeline. You are required to enforce zero-downtime healthcheck checks, strict isolation between internal networks, and optimal caching layers across all frontend and backend stages.",
};

export const ASSIGNMENT_DELIVERABLES = [
  {
    id: "del-1",
    title: "Dockerfile for Next.js frontend with multi-stage build optimization",
    detail: "Alpine base, standalone output mode, and non-root node user execution.",
    defaultDone: true,
  },
  {
    id: "del-2",
    title: "Express.js Auth & Course microservices with Docker healthchecks",
    detail: "Implemented /healthz endpoints pinged every 15s with graceful teardown.",
    defaultDone: true,
  },
  {
    id: "del-3",
    title: "docker-compose.prod.yml orchestrating Gateway, Redis & Mongo",
    detail: "Isolated backend network, dedicated persistent volume binds, and resource caps.",
    defaultDone: true,
  },
  {
    id: "del-4",
    title: "GitHub repository with README architectural diagram and setup steps",
    detail: "Must include ASCII or Mermaid sequence graph and seed database command.",
    defaultDone: false,
  },
  {
    id: "del-5",
    title: "Live deployed URL verified on DigitalOcean Droplet or AWS EC2",
    detail: "Fully accessible over HTTPS with self-renewing Certbot SSL certificates.",
    defaultDone: false,
  },
];

export const ASSIGNMENT_RUBRIC = [
  {
    title: "Code Architecture",
    points: "30 Pts",
    width: "30%",
    barClass: "bg-primary",
    description:
      "Proper microservice modularity, domain isolation, error handling, and clean code principles.",
  },
  {
    title: "Dockerfile Optimization",
    points: "25 Pts",
    width: "25%",
    barClass: "bg-secondary",
    description:
      "Multi-stage caching, minimal footprint layer ordering, and production hardening.",
  },
  {
    title: "Security & Reverse Proxy",
    points: "25 Pts",
    width: "25%",
    barClass: "bg-tertiary",
    description:
      "Rate limiting via Redis, HTTP security headers, Nginx TLS termination, and hidden tokens.",
  },
  {
    title: "Documentation & Setup",
    points: "20 Pts",
    width: "20%",
    barClass: "bg-tertiary-container",
    description:
      "Clear step-by-step setup README, architectural flowcharts, and environment templates.",
  },
];

export const ASSIGNMENT_ASSETS = [
  {
    id: "asset-1",
    name: "starter-microservices-scaffold.zip",
    meta: "14.2 MB • Node 20 LTS template",
    tone: "primary",
  },
  {
    id: "asset-2",
    name: "nginx-reverse-proxy.conf",
    meta: "4.1 KB • SSL upstream config",
    tone: "tertiary",
  },
];

export const ASSIGNMENT_REVISIONS = [
  {
    id: "rev-2",
    badge: "R2",
    title: "Revision #02 (Current Version)",
    date: "Oct 28, 2024 • 09:45 PM BST",
    status: "Under Review",
    statusTone: "secondary",
    summary:
      "Updated Docker multi-stage configuration using Next.js standalone output. Total final image size pruned from 640MB to 184MB. Updated MongoDB replica seed init scripts.",
    mentor: "Engr. Tanvir Hasan",
    score: null,
    feedback: null,
  },
  {
    id: "rev-1",
    badge: "R1",
    title: "Revision #01 (Initial Submission)",
    date: "Oct 26, 2024 • 11:20 AM BST",
    status: "Evaluated",
    statusTone: "tertiary",
    summary: null,
    mentor: "Engr. Tanvir Hasan",
    score: 78,
    feedback:
      "Great separation of Express microservices and solid Redis token caching implementation. However, please optimize Docker multi-stage build cache to reduce your Next.js image size below 250MB. Make sure to bind Nginx port 443 with valid SSL certificates.",
  },
];
