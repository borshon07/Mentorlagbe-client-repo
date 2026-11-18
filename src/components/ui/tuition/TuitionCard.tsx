import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Tuition } from "@/types";

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="h-44 w-full bg-muted">
        {tuition.bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tuition.bannerImage}
            alt={tuition.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {tuition.subject}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {tuition.classLevel}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {tuition.mode}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[3rem] text-lg font-semibold leading-snug">
          {tuition.title}
        </h3>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{tuition.location || tuition.mode}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {tuition.daysPerWeek} days / week
          </p>
          <p>Tutor: {tuition.tutorName}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-xl font-bold">
            ${tuition.monthlyFee}
            <span className="text-xs font-normal text-muted-foreground"> /month</span>
          </p>
          <Link
            href={`/tuitions/${tuition._id}`}
            className={buttonVariants({ size: "sm" })}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}