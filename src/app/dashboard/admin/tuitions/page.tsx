"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Tuition } from "@/types";
import StatusBadge from "@/components/ui/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Tuition[]>("/api/admin/tuitions")
      .then(setTuitions)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, approvalStatus: "approved" | "rejected") => {
    try {
      await authFetch(`/api/admin/tuitions/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ approvalStatus }),
      });
      setTuitions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, approvalStatus } : t))
      );
      toast.success(`Tuition ${approvalStatus}`);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  if (loading) return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tuition Approval</h1>

      {tuitions.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          No tuition posts yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((t) => (
                <tr key={t._id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3">
                    <p>{t.tutorName}</p>
                    <p className="text-xs text-muted-foreground">{t.tutorEmail}</p>
                  </td>
                  <td className="px-4 py-3">{t.subject}</td>
                  <td className="px-4 py-3">${t.monthlyFee}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.approvalStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        disabled={t.approvalStatus === "approved"}
                        onClick={() => updateStatus(t._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={t.approvalStatus === "rejected"}
                        onClick={() => updateStatus(t._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}