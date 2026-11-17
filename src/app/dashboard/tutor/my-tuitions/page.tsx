"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Tuition } from "@/types";
import StatusBadge from "@/components/ui/dashboard/StatusBadge";
import TuitionForm, { type TuitionFormValues } from "@/components/ui/tuition/TuitionForm";
import { Button } from "@/components/ui/button";

export default function MyTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Tuition | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authFetch<Tuition[]>("/api/tuitions/my")
      .then(setTuitions)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const res = await authFetch<{ isActive: boolean }>(
        `/api/tuitions/${id}/toggle`,
        { method: "PATCH" }
      );
      setTuitions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isActive: res.isActive } : t))
      );
      toast.success(res.isActive ? "Tuition is now active" : "Tuition closed");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tuition permanently?")) return;
    try {
      await authFetch(`/api/tuitions/${id}`, { method: "DELETE" });
      setTuitions((prev) => prev.filter((t) => t._id !== id));
      toast.success("Tuition deleted");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleUpdate = async (values: TuitionFormValues) => {
    if (!editing) return;
    setSaving(true);
    try {
      const body = {
        ...values,
        monthlyFee: Number(values.monthlyFee),
        daysPerWeek: Number(values.daysPerWeek),
      };
      await authFetch(`/api/tuitions/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setTuitions((prev) =>
        prev.map((t) => (t._id === editing._id ? { ...t, ...body } : t))
      );
      toast.success("Tuition updated");
      setEditing(null);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;
  }

  if (editing) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Tuition</h1>
          <Button variant="outline" onClick={() => setEditing(null)}>
            Cancel
          </Button>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <TuitionForm
            key={editing._id}
            initial={{
              title: editing.title,
              subject: editing.subject,
              classLevel: editing.classLevel,
              mode: editing.mode,
              location: editing.location,
              monthlyFee: String(editing.monthlyFee),
              daysPerWeek: String(editing.daysPerWeek),
              bannerImage: editing.bannerImage,
              description: editing.description,
            }}
            submitLabel="Save Changes"
            submitting={saving}
            onSubmit={handleUpdate}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Tuitions</h1>

      {tuitions.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          You have not posted any tuition yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Approval</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((t) => (
                <tr key={t._id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3">{t.subject}</td>
                  <td className="px-4 py-3">${t.monthlyFee}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.approvalStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.isActive ? "active" : "closed"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditing(t)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleToggle(t._id)}>
                        {t.isActive ? "Close" : "Activate"}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(t._id)}>
                        Delete
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