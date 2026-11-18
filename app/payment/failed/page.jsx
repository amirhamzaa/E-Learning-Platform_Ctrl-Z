import { PaymentFailedView } from "@/components/payments/PaymentFailedView";

export const metadata = {
  title: "Payment Verification Unsuccessful | Shikhbe Shobai",
  description:
    "Transaction diagnostic details, 2-hour temporary seat guarantee countdown, retry actions, and priority billing support.",
};

export default function PaymentFailedPage() {
  return <PaymentFailedView />;
}
