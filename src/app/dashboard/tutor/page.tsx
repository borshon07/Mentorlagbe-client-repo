"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Users, Crown } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { Tuition, Application } from "@/types";
import StatCard from "@/components/ui/dashboard/StatCard";

export default function TutorOverview() {
  const { data: session } = useSession();
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      authFetch<Tuition[]>("/api/tuitions/my"),
      authFetch<Application[]>("/api/applications/applicants"),
    ])
      .then(([t, a]) => {
        setTuitions(t);
        setApplicants(a);
      })
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
      <h1 className="text-2xl font-bold">Tutor Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Tuitions Posted"
          value={tuitions.length}
          icon={<BookOpen className="h-5 w-5" />}
        />
        <StatCard
          label="Active / Approved Tuitions"
          value={tuitions.filter((t) => t.approvalStatus === "approved" && t.isActive).length}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <StatCard
          label="Total Applicants"
          value={applicants.length}
          icon={<Users className="h-5 w-5" />}
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