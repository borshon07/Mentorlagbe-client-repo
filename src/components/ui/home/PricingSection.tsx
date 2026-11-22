"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import SectionHeading from "@/components/ui/shared/SectionHeading";

const PLANS = [
  {
    key: "tutor",
    title: "Tutor",
    free: ["Post up to 2 tuitions", "Manage applicants", "Basic profile"],
    pro: [
      "Unlimited tuition posts",
      "Verified badge",
      "Priority listing support",
    ],
    price: 15,
  },
  {
    key: "student",
    title: "Student",
    free: [
      "Browse and apply to tuitions",
      "Track applications",
      "Basic profile",
    ],
    pro: [
      "Priority booking",
      "Everything in Free",
      "Early access to new batches",
    ],
    price: 10,
  },
] as const;

export default function PricingSection() {
  const { data: session, isPending } = useSession();
  const [loadingKey, setLoadingKey] = useState("");

  const user = session?.user as { role?: string; plan?: string } | undefined;

  const subscribe = async (key: string) => {
    setLoadingKey(key);
    try {
      const res = await authFetch<{ url: string }>(
        "/api/payments/create-checkout-session",
        { method: "POST" },
      );
      const checkoutUrl = res.url;
      window.location.assign(checkoutUrl);
    } catch (e) {
      toast.error((e as Error).message);
      setLoadingKey("");
    }
  };

  const renderCta = (key: string) => {
    if (isPending)
      return (
        <Button disabled className="w-full">
          Loading...
        </Button>
      );

    if (!user) {
      return (
        <Link href="/sign-in" className={`${buttonVariants()} w-full`}>
          Sign in to subscribe
        </Link>
      );
    }
    if (user.role !== key) {
      return (
        <Button disabled className="w-full">
          For {key}s only
        </Button>
      );
    }
    if (user.plan === "pro") {
      return (
        <Button disabled className="w-full">
          Current plan
        </Button>
      );
    }
    return (
      <Button
        className="w-full"
        disabled={loadingKey === key}
        onClick={() => subscribe(key)}
      >
        {loadingKey === key ? "Redirecting..." : "Subscribe with Stripe"}
      </Button>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        subtitle="Start free. Upgrade to Pro when you need more."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PLANS.map((p) => (
          <div
            key={p.key}
            className="glass liquid-card flex h-full flex-col rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold">{p.title} Plans</h3>

            <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="text-sm font-semibold uppercase text-muted-foreground">
                  Free
                </p>
                <p className="mt-1 text-2xl font-bold">$0</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {p.free.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border-2 border-primary bg-primary/5 p-4">
                {" "}
                <p className="text-sm font-semibold uppercase text-primary">
                  Pro
                </p>
                <p className="mt-1 text-2xl font-bold">${p.price}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {p.pro.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">{renderCta(p.key)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
