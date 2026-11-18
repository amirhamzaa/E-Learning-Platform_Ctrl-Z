import { PaymentStatusInvoiceView } from "@/components/payments/PaymentStatusInvoiceView";

export const metadata = {
  title: "Payment Status & Invoice | Shikhbe Shobai",
  description:
    "Interactive payment verification status with official VAT receipt, enrolled cohort summary, and declined state diagnostics.",
};

export default function PaymentInvoicePage() {
  return <PaymentStatusInvoiceView />;
}
