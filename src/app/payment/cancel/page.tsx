import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <XCircle className="h-14 w-14 text-amber-500" />
      <h1 className="text-2xl font-bold">Payment cancelled</h1>
      <p className="text-muted-foreground">
        No money was charged. You can upgrade any time.
      </p>
      <Link href="/pricing" className={buttonVariants()}>
        Back to Pricing
      </Link>
    </main>
  );
}