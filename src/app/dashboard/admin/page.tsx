"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import StatCard from "@/components/ui/dashboard/StatCard";

type Stats = {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  pendingTuitions: number;
  approvedTuitions: number;
  totalRevenue: number;
};

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Stats>("/api/admin/stats")
      .then(setStats)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Users" value={stats.totalUsers} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Total Tutors" value={stats.totalTutors} icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard label="Total Students" value={stats.totalStudents} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Pending Tuitions" value={stats.pendingTuitions} icon={<Clock className="h-5 w-5" />} />
        <StatCard label="Approved Tuitions" value={stats.approvedTuitions} icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label="Total Stripe Revenue" value={`$${stats.totalRevenue}`} icon={<DollarSign className="h-5 w-5" />} />
      </div>
    </div>
  );
}