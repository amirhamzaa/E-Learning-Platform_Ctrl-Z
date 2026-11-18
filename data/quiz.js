export const QUIZ_META = {
  courseBadge: "Full Stack MERN with Next.js • Module 4: Authentication & Security",
  title: "Quiz #04: JWT Tokens, HttpOnly Cookies & RBAC Authorization",
  totalSeconds: 18 * 60 + 42,
  allocatedLabel: "/ 25:00",
  totalQuestions: 15,
};

export const QUIZ_QUESTIONS = Array.from({ length: 15 }, (_, idx) => {
  const num = idx + 1;
  if (num === 7) {
    return {
      number: 7,
      points: "+2.00 Points",
      type: "Single Correct Answer",
      prompt:
        "When implementing HttpOnly cookie storage for JWT refresh tokens in Next.js 14 Route Handlers, what is the primary security advantage over storing tokens in browser localStorage?",
      codeFile: "app/api/auth/refresh/route.js",
      codeLang: "JavaScript / Next.js 14",
      code: `// Next.js Route Handler cookie configuration
const cookieStore = cookies();
cookieStore.set('refreshToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/'
});`,
      options: [
        {
          id: "A",
          label: "Option A",
          text: "It allows client-side JavaScript (e.g., document.cookie) to read and modify the token directly during React component hydration.",
        },
        {
          id: "B",
          label: "Option B",
          text: "It completely mitigates client-side Cross-Site Scripting (XSS) attacks by preventing unauthorized browser JavaScript access to the sensitive refresh token payload.",
        },
        {
          id: "C",
          label: "Option C",
          text: "It automatically encrypts the token payload using the client machine's local SSL/TLS private certificate store before network dispatch.",
        },
        {
          id: "D",
          label: "Option D",
          text: "It automatically bypasses all Cross-Origin Resource Sharing (CORS) preflight checks on third-party API domains without CORS headers.",
        },
      ],
    };
  }

  return {
    number: num,
    points: "+2.00 Points",
    type: "Single Correct Answer",
    prompt:
      num === 8
        ? "In a tiered RBAC authorization middleware pipeline for Express/Node.js, what is the safest architectural approach when handling role revocations for a high-privilege administrator before their current JWT access token expires?"
        : `Question #${String(num).padStart(2, "0")}: Which architectural pattern best protects stateless JWT verification and session rotation across distributed Next.js Edge and Express microservices?`,
    codeFile: null,
    codeLang: null,
    code: null,
    options: [
      {
        id: "A",
        label: "Option A",
        text: "Rely exclusively on long-lived access tokens without server-side revocation checks.",
      },
      {
        id: "B",
        label: "Option B",
        text: "Use short-lived access tokens paired with HttpOnly refresh token rotation and Redis jti revocation tracking.",
      },
      {
        id: "C",
        label: "Option C",
        text: "Embed database passwords inside the base64url JWT payload to avoid secondary lookups.",
      },
      {
        id: "D",
        label: "Option D",
        text: "Disable HTTPS enforcement on internal API gateways to reduce TLS latency.",
      },
    ],
  };
});

export const QUIZ_INITIAL_ANSWERS = {
  1: "B",
  2: "B",
  3: "B",
  4: "B",
  5: "B",
  6: "B",
  7: "B",
};

export const QUIZ_INITIAL_REVIEW_FLAGS = [8];
