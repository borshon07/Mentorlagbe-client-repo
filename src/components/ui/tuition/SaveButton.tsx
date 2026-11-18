"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function SaveButton({ tuitionId }: { tuitionId: string }) {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (role !== "student") return;
    let cancelled = false;
    authFetch<string[]>("/api/users/saved/ids")
      .then((ids) => {
        if (!cancelled) setSaved(ids.includes(tuitionId));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [role, tuitionId]);

  if (role !== "student") return null;

  const toggle = async () => {
    setBusy(true);
    try {
      const res = await authFetch<{ saved: boolean }>(
        `/api/users/saved/${tuitionId}`,
        { method: "POST" }
      );
      setSaved(res.saved);
      toast.success(res.saved ? "Saved to your list" : "Removed from saved");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-label={saved ? "Remove from saved" : "Save tuition"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
        saved
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card hover:bg-muted"
      }`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
    </button>
  );
}