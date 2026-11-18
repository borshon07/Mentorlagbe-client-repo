"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardIndex() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending || !session) return;
    const role = (session.user as { role?: string }).role || "student";
    router.replace(`/dashboard/${role}`);
  }, [isPending, session, router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}