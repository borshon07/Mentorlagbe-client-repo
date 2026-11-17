"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import TuitionForm, { type TuitionFormValues } from "@/components/ui/tuition/TuitionForm";

export default function PostTuitionPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: TuitionFormValues) => {
    setSubmitting(true);
    try {
      await authFetch("/api/tuitions", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          monthlyFee: Number(values.monthlyFee),
          daysPerWeek: Number(values.daysPerWeek),
        }),
      });
      toast.success("Tuition posted. Waiting for admin approval.");
      router.push("/dashboard/tutor/my-tuitions");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post a Tuition</h1>
        <p className="text-sm text-muted-foreground">
          Free plan allows 2 posts. Upgrade to Pro for unlimited posts.
        </p>
      </div>
      <div className="rounded-2xl border bg-card p-6">
        <TuitionForm
          submitLabel="Post Tuition"
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}