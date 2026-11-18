export const QUIZ_RESULT_SUMMARY = {
  moduleBadge: "Full Stack MERN Module 4",
  assessmentId: "QZ-MERN-84920-04",
  title: "Quiz Performance Scorecard & Evaluation",
  subtitle: "Quiz #04: JWT Tokens, HttpOnly Cookies & RBAC Authorization Architecture",
  studentName: "Ariful Islam",
  studentId: "ID: SS-84920",
  submittedDate: "Submitted Oct 28, 2024",
  submittedTime: "09:42 PM BST",
  statusTitle: "PASSED (Honor Roll)",
  statusNote: "Exceeds 85% Benchmark requirement",
  grade: "Grade A+",
  percentage: "86.7",
  marksObtained: 26,
  marksTotal: 30,
  mentorName: "Engr. Tanvir Hasan",
  mentorRole: "Lead Software Architect & Instructor",
  mentorAvatar: "/images/quiz-result-1.jpg",
  mentorQuote:
    "Exceptional grasp of stateless authentication patterns! Your mastery over token lifecycles and HTTP-only cookie vectors demonstrates production-level readiness for the Capstone Microservices assignment.",
};

export const QUIZ_RESULT_BREAKDOWN = [
  {
    id: "q-07",
    number: "07",
    status: "correct",
    statusBadge: "Correct • +2.0 Marks",
    topic: "Topic: Cookie Security & Next.js 14 Handlers",
    timeSpent: "58 seconds spent",
    prompt:
      "When implementing HttpOnly cookie storage for JWT refresh tokens in Next.js 14 Route Handlers, what is the primary security advantage over storing tokens in browser localStorage?",
    options: [
      {
        letter: "A",
        text: "Eliminates the possibility of Cross-Site Request Forgery (CSRF) without requiring CSRF anti-forgery tokens.",
        state: "neutral",
      },
      {
        letter: "B",
        text: "HttpOnly cookies cannot be accessed by client-side JavaScript scripts via document.cookie, completely mitigating Cross-Site Scripting (XSS) token exfiltration attacks.",
        state: "correct-picked",
        badge: "Your Choice (Correct)",
      },
      {
        letter: "C",
        text: "Guarantees automatic payload cryptographic encryption by the browser client engine before transmission.",
        state: "neutral",
      },
      {
        letter: "D",
        text: "Reduces total network payload header sizes by compressing base64url encoded tokens.",
        state: "neutral",
      },
    ],
    explanationTitle: "Comprehensive Concept Explanation",
    explanationMeta: null,
    explanation:
      "The HttpOnly flag instructs the client browser that the cookie is prohibited from being exposed through the Document.cookie Web API. Even if malicious third-party dependencies or script injection (XSS) compromise the frontend DOM, an attacker cannot harvest stored credentials directly. Note that CSRF defense still requires SameSite=Strict/Lax or anti-CSRF tokens.",
  },
  {
    id: "q-08",
    number: "08",
    status: "incorrect",
    statusBadge: "Incorrect • 0.0 Marks (Penalty -2.0)",
    topic: "Topic: Role-Based Access Control (RBAC) Architecture",
    timeSpent: "1 min 45 seconds spent",
    prompt:
      "In a tiered RBAC authorization middleware pipeline for Express/Node.js, what is the safest architectural approach when handling role revocations for a high-privilege administrator before their current JWT access token expires?",
    options: [
      {
        letter: "A",
        text: "Rely exclusively on the JWT access token expiry (exp claim) since stateless tokens cannot and should not be modified mid-flight.",
        state: "incorrect-picked",
        badge: "Your Selection (Incorrect)",
      },
      {
        letter: "B",
        text: "Send a WebSocket payload to the client browser requesting that it voluntarily deletes its stored access cookie.",
        state: "neutral",
      },
      {
        letter: "C",
        text: "Maintain an in-memory Redis blocklist / token revocation cache and verify the token's unique jti identifier against the store during sensitive RBAC authorization checks.",
        state: "correct",
        badge: "Correct Solution",
      },
      {
        letter: "D",
        text: "Regenerate the global JWT symmetric secret key on the authorization server for all currently connected users.",
        state: "neutral",
      },
    ],
    explanationTitle: "Mentor Breakdown & Rectification",
    explanationMeta: "Instructor Note by Engr. Tanvir",
    explanation:
      "While JWTs are conceptually stateless, enterprise security mandates instant invalidation when roles, permissions, or session validity are revoked. Storing revoked jti (JWT ID) claims in a Redis cache with a TTL matched to the remaining token lifetime provides near-instantaneous revocation checks with negligible O(1) latency overhead.",
  },
  {
    id: "q-15",
    number: "15",
    status: "skipped",
    statusBadge: "Skipped / Unanswered • 0 Marks",
    topic: "Topic: Asymmetric RSA Keypairs vs Symmetric HMAC",
    timeSpent: "0 seconds spent",
    prompt:
      "Which algorithm family allows an authentication microservice to sign JWTs using a private key while permitting internal downstream microservices to verify token signatures using only a public key without exposing signing capabilities?",
    options: [
      {
        letter: "A",
        text: "HMAC-SHA256 (HS256) with shared environment variable secrets",
        state: "neutral",
      },
      {
        letter: "B",
        text: "RS256 (RSA Signature with SHA-256) or ES256 (ECDSA) public/private key algorithms",
        state: "correct",
        badge: "Correct Solution",
      },
      {
        letter: "C",
        text: "AES-256-GCM symmetric block ciphers with initialization vectors",
        state: "neutral",
      },
    ],
    explanationTitle: "Key Takeaway",
    explanationMeta: null,
    explanation:
      "Asymmetric algorithms like RS256/ES256 decouple signing privilege from verification privilege. Downstream APIs can safely download public JWKS (JSON Web Key Sets) to verify tokens without possessing the master private key required for forging tokens.",
  },
];
