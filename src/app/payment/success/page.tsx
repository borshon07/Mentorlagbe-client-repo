"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";

function SuccessContent() {
  const sessionId = useSearchParams().get("session_id");
  const { refetch } = useSession();
  const [result, setResult] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    authFetch(`/api/payments/verify?session_id=${sessionId}`)
      .then(async () => {
        await refetch();
        if (!cancelled) setResult({ status: "success", message: "" });
      })
      .catch((e) => {
        if (!cancelled) setResult({ status: "error", message: e.message });
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId, refetch]);

  if (!sessionId) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <XCircle className="h-14 w-14 text-red-500" />
        <h1 className="text-2xl font-bold">Could not verify payment</h1>
        <p className="text-muted-foreground">No payment session found.</p>
        <Link href="/pricing" className={buttonVariants()}>
          Back to Pricing
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-muted-foreground">Confirming your payment...</p>
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <XCircle className="h-14 w-14 text-red-500" />
        <h1 className="text-2xl font-bold">Could not verify payment</h1>
        <p className="text-muted-foreground">{result.message}</p>
        <Link href="/pricing" className={buttonVariants()}>
          Back to Pricing
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <CheckCircle2 className="h-14 w-14 text-emerald-500" />
      <h1 className="text-2xl font-bold">Payment successful</h1>
      <p className="text-muted-foreground">Your account is now on the Pro plan.</p>
      <Link href="/dashboard" className={buttonVariants()}>
        Go to Dashboard
      </Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}