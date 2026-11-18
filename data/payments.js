export const CHECKOUT_LOCAL_WALLETS = [
  { id: "bkash", name: "bKash", sub: "Instant PIN", colorClass: "text-[#e2136e]" },
  { id: "nagad", name: "Nagad", sub: "Official App", colorClass: "text-[#ea1d25]" },
  { id: "rocket", name: "Rocket", sub: "DBBL Pay", colorClass: "text-[#8c3494]" },
  { id: "upay", name: "Upay", sub: "UCB MFS", colorClass: "text-[#0066b2]" },
  { id: "nexus", name: "Nexus", sub: "Debit Card", colorClass: "text-[#1877f2]" },
  { id: "netbank", name: "NetBanking", sub: "32+ Banks", colorClass: "text-primary-container" },
];

export const CHECKOUT_DIVISIONS = [
  "Dhaka, Bangladesh",
  "Chittagong, Bangladesh",
  "Sylhet, Bangladesh",
  "Rajshahi, Bangladesh",
  "Khulna, Bangladesh",
  "Expatriate / Overseas Student",
];

export const PAYMENT_ORDER_DATA = {
  studentName: "Ariful Islam",
  studentEmail: "ariful.dev@gmail.com",
  orderId: "#SS-ORD-984210",
  trxId: "BKH8927402941",
  method: "bKash Mobile Wallet (01712-***678)",
  timestamp: "Nov 02, 2024 • 10:45 AM BST",
  courseTitle: "Full Stack MERN with Next.js 14 & TypeScript",
  batchLabel: "Batch #SS-MERN-102",
  mentorName: "Engr. Tanvir Hasan",
  mentorRole: "Senior Cloud Solutions Architect",
  mentorAvatar: "/images/pay-invoice-1.jpg",
  checkoutThumb: "/images/checkout-1.jpg",
  regularFee: "৳ 16,000 BDT",
  discountLabel: "Early Bird Grant (25% Savings)",
  discountAmount: "- ৳ 4,000 BDT",
  totalPaid: "৳ 12,000 BDT",
};

export const PAYMENT_FAILED_FAQS = [
  {
    id: "faq-1",
    question: "Were you charged by mistake?",
    answer:
      "If funds left your MFS balance but the order failed, the banking aggregate holds the amount in an escrow staging pool. It is automatically refunded to your mobile account within 24 to 48 hours without any manual claim required.",
  },
  {
    id: "faq-2",
    question: "Can I pay via manual bank transfer?",
    answer:
      "Yes. You may deposit via City Bank, BRAC Bank, or Dutch-Bangla Bank (NPSB/BEFTN). Reach out to our WhatsApp Support Desk to receive the formal institutional routing numbers and submit your transfer receipt.",
  },
  {
    id: "faq-3",
    question: "Will my seat be released immediately?",
    answer:
      "No. We lock your batch seat for exactly 2 hours after a failed checkout sequence. You can comfortably recharge your wallet or switch cards without losing your placement.",
  },
];
