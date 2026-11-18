"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import type { Tuition } from "@/types";
import TuitionCard from "@/components/ui/tuition/TuitionCard";
import { buttonVariants, Button } from "@/components/ui/button";

export default function SavedTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch<Tuition[]>("/api/users/saved")
      .then(setTuitions)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id: string) => {
    try {
      await authFetch(`/api/users/saved/${id}`, { method: "POST" });
      setTuitions((prev) => prev.filter((t) => t._id !== id));
      toast.success("Removed from saved");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Saved Tuitions</h1>

      {tuitions.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center">
          <p className="text-lg font-semibold">No saved tuitions yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the bookmark icon on a tuition to save it here.
          </p>
          <Link href="/tuitions" className={`${buttonVariants()} mt-4`}>
            Browse Tuitions
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tuitions.map((t) => (
            <div key={t._id} className="flex flex-col gap-2">
              <div className="flex-1">
                <TuitionCard tuition={t} />
              </div>
              <Button variant="outline" size="sm" onClick={() => remove(t._id)}>
                Remove from saved
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}