"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Application } from "@/types";
import StatusBadge from "@/components/ui/dashboard/StatusBadge";
import StarRating from "@/components/ui/shared/StarRating";
import { Button } from "@/components/ui/button";

export default function MyApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [reviewing, setReviewing] = useState<Application | null>(null);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [savingReview, setSavingReview] = useState(false);

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

  const handleReview = async () => {
    if (!reviewing) return;
    setSavingReview(true);
    try {
      await authFetch(`/api/applications/${reviewing._id}/review`, {
        method: "PATCH",
        body: JSON.stringify({ rating, review: text }),
      });
      setApps((prev) =>
        prev.map((a) =>
          a._id === reviewing._id ? { ...a, rating, review: text } : a,
        ),
      );
      toast.success("Thanks for your review");
      setReviewing(null);
      setText("");
      setRating(5);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSavingReview(false);
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
                    <p className="text-xs text-muted-foreground">
                      {a.tutorEmail}
                    </p>
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
                    ) : a.status === "accepted" ? (
                      a.rating ? (
                        <StarRating value={a.rating} />
                      ) : (
                        <Button size="sm" onClick={() => setReviewing(a)}>
                          <Star className="mr-1 h-3.5 w-3.5" /> Rate
                        </Button>
                      )
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

      {reviewing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="glass-strong w-full max-w-md space-y-4 rounded-2xl p-6">
            <h3 className="text-lg font-semibold">
              Rate {reviewing.tuitionTitle}
            </h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star`}
                >
                  <Star
                    className={`h-8 w-8 transition ${
                      n <= rating
                        ? "fill-[#E9C9A5] text-[#E9C9A5]"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              rows={4}
              maxLength={500}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience (optional)"
              className="w-full rounded-lg border bg-white/60 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-white/5"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReviewing(null)}>
                Cancel
              </Button>
              <Button onClick={handleReview} disabled={savingReview}>
                {savingReview ? "Saving..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}