import { CheckoutPaymentView } from "@/components/payments/CheckoutPaymentView";

export const metadata = {
  title: "Checkout & Enrollment | Shikhbe Shobai",
  description:
    "Finalize cohort enrollment via SSLCommerz (bKash, Nagad, Rocket) or Stripe international cards with instant LMS activation.",
};

export default function CheckoutPage() {
  return <CheckoutPaymentView />;
}
