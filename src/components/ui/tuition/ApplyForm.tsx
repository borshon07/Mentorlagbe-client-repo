"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  studentPhone: z
    .string()
    .min(8, "Enter a valid phone number")
    .regex(/^[0-9+\-\s]+$/, "Only numbers, +, - and spaces allowed"),
  preferredSchedule: z.string().min(3, "Enter your preferred schedule"),
  studentNote: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function ApplyForm({ tuitionId }: { tuitionId: string }) {
  const { data: session, isPending } = useSession();
  const [applied, setApplied] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const role = (session?.user as { role?: string } | undefined)?.role;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { studentPhone: "", preferredSchedule: "", studentNote: "" },
  });

  useEffect(() => {
    if (isPending || role !== "student") return;
    let cancelled = false;
    authFetch<{ applied: boolean }>(`/api/applications/check/${tuitionId}`)
      .then((r) => {
        if (!cancelled) setApplied(r.applied);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isPending, role, tuitionId]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await authFetch("/api/applications", {
        method: "POST",
        body: JSON.stringify({ tuitionId, ...values }),
      });
      toast.success("Application submitted");
      setApplied(true);
    } catch (e) {
      const msg = (e as Error).message;
      toast.error(msg);
      if (msg.toLowerCase().includes("already applied")) setApplied(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;
  }

  if (!session) {
    return (
      <div className="glass-strong rounded-2xl p-6 text-center">
        <p className="font-semibold">Sign in to apply</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Only students can apply for a tuition.
        </p>
        <Link href="/sign-in" className={`${buttonVariants()} mt-4`}>
          Sign In
        </Link>
      </div>
    );
  }

  if (role !== "student") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
        <p className="font-semibold">Applications are for students only</p>
        <p className="mt-1 text-sm">
          You are signed in as {role}. Switch to a student account to apply.
        </p>
        <Button className="mt-4" disabled>
          Apply Now
        </Button>
      </div>
    );
  }

  if (!checking && applied) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
        <p className="font-semibold">You have already applied</p>
        <p className="mt-1 text-sm">Track the status in your dashboard.</p>
        <Link
          href="/dashboard/student/my-applications"
          className={`${buttonVariants({ variant: "outline" })} mt-4`}
        >
          View My Applications
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-strong space-y-4 rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold">Apply for this tuition</h3>

      <div className="space-y-2">
        <Label htmlFor="studentPhone">Phone</Label>
        <Input id="studentPhone" placeholder="+8801XXXXXXXXX" {...register("studentPhone")} />
        {errors.studentPhone && (
          <p className="text-sm text-red-500">{errors.studentPhone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredSchedule">Preferred Schedule</Label>
        <Input
          id="preferredSchedule"
          placeholder="Sat, Mon, Wed - 5 PM"
          {...register("preferredSchedule")}
        />
        {errors.preferredSchedule && (
          <p className="text-sm text-red-500">{errors.preferredSchedule.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="studentNote">Learning Note</Label>
        <textarea
          id="studentNote"
          rows={4}
          placeholder="Tell the tutor what you want to learn"
          className="w-full rounded-lg border bg-white/60 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-white/5"
          {...register("studentNote")}
        />
      </div>

      <Button type="submit" className="w-full" disabled={submitting || checking}>
        {submitting ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
}