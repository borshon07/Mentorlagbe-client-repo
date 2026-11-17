"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Application } from "@/types";
import StatusBadge from "@/components/ui/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";

export default function MyApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Application[]>("/api/applications/my")
      .then(setApps)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this application?")) return;
    try {
      await authFetch(`/api/applications/${id}`, { method: "DELETE" });
      setApps((prev) => prev.filter((a) => a._id !== id));
      toast.success("Application cancelled");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Applications</h1>

      {apps.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          You have not applied to any tuition yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a._id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{a.tuitionTitle}</td>
                  <td className="px-4 py-3">
                    <p>{a.tutorName}</p>
                    <p className="text-xs text-muted-foreground">{a.tutorEmail}</p>
                  </td>
                  <td className="px-4 py-3">${a.monthlyFee}</td>
                  <td className="px-4 py-3">
                    {new Date(a.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3">
                    {a.status === "pending" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancel(a._id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
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