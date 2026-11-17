"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Application } from "@/types";
import StatusBadge from "@/components/ui/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";

export default function ApplicantsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Application[]>("/api/applications/applicants")
      .then(setApps)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: "accepted" | "rejected") => {
    try {
      await authFetch(`/api/applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setApps((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      toast.success(`Application ${status}`);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applicants</h1>

      {apps.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          No student has applied to your tuitions yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a._id} className="border-b last:border-0 align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium">{a.studentName}</p>
                    <p className="text-xs text-muted-foreground">{a.studentEmail}</p>
                  </td>
                  <td className="px-4 py-3">{a.studentPhone}</td>
                  <td className="px-4 py-3">{a.tuitionTitle}</td>
                  <td className="px-4 py-3">{a.preferredSchedule}</td>
                  <td className="max-w-[200px] px-4 py-3 text-muted-foreground">
                    {a.studentNote || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        disabled={a.status === "accepted"}
                        onClick={() => updateStatus(a._id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={a.status === "rejected"}
                        onClick={() => updateStatus(a._id, "rejected")}
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