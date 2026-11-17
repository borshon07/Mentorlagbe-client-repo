"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle2, Clock, Crown } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { Application } from "@/types";
import StatCard from "@/components/ui/dashboard/StatCard";

export default function StudentOverview() {
  const { data: session } = useSession();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Application[]>("/api/applications/my")
      .then(setApps)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const plan = (session?.user as { plan?: string } | undefined)?.plan ?? "free";

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Applied Tuitions"
          value={apps.length}
          icon={<FileText className="h-5 w-5" />}
        />
        <StatCard
          label="Accepted Applications"
          value={apps.filter((a) => a.status === "accepted").length}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <StatCard
          label="Pending Applications"
          value={apps.filter((a) => a.status === "pending").length}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          label="Current Plan"
          value={plan === "pro" ? "Pro" : "Free"}
          icon={<Crown className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}