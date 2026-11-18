import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock, Layers, User } from "lucide-react";
import type { Tuition } from "@/types";
import ApplyForm from "@/components/ui/tuition/ApplyForm";
import SaveButton from "@/components/ui/tuition/SaveButton";
import { buttonVariants } from "@/components/ui/button";

async function getTuition(id: string): Promise<Tuition | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function TuitionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tuition = await getTuition(id);

  if (!tuition) notFound();

  const unavailable = tuition.approvalStatus !== "approved" || !tuition.isActive;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        href="/tuitions"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Back to Tuitions
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-muted md:h-96">
            {tuition.bannerImage ? (
              <Image
                src={tuition.bannerImage}
                alt={tuition.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {tuition.subject}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {tuition.classLevel}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {tuition.mode}
              </span>
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold leading-tight">{tuition.title}</h1>
              <SaveButton tuitionId={tuition._id} />
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-2">
            <p className="flex items-center gap-3 text-sm">
              <MapPin className="h-5 w-5 text-primary" />
              {tuition.location || tuition.mode}
            </p>
            <p className="flex items-center gap-3 text-sm">
              <Clock className="h-5 w-5 text-primary" />
              {tuition.daysPerWeek} days per week
            </p>
            <p className="flex items-center gap-3 text-sm">
              <Layers className="h-5 w-5 text-primary" />
              {tuition.classLevel}
            </p>
            <p className="text-lg font-bold">
              ${tuition.monthlyFee}
              <span className="text-sm font-normal text-muted-foreground"> /month</span>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">About this tuition</h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">
              {tuition.description}
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {tuition.tutorName.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <User className="h-4 w-4" /> {tuition.tutorName}
              </p>
              <p className="text-sm text-muted-foreground">{tuition.tutorEmail}</p>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {unavailable ? (
            <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
              This tuition is not accepting applications right now.
            </div>
          ) : (
            <ApplyForm tuitionId={tuition._id} />
          )}
        </aside>
      </div>
    </main>
  );
}