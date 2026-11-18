import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Tuition } from "@/types";

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
  return (
    <div className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {tuition.bannerImage ? (
          <Image
            src={tuition.bannerImage}
            alt={tuition.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/40 to-transparent" />
        {tuition.tutorPlan === "pro" && (
          <span className="btn-accent absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified Tutor
          </span>
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
          <p className="flex items-center gap-1">
            Tutor: {tuition.tutorName}
            {tuition.tutorPlan === "pro" && (
              <BadgeCheck className="h-4 w-4 text-primary" />
            )}
          </p>
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