import Link from "next/link";
import { Search, ShieldCheck, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" /> Verified tutors across
            Bangladesh
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Find Your Ideal Tutor or Mentorship Batch Today
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Search tuitions by subject, class level, mode and monthly budget.
            Apply in minutes and track every application in one place.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tuitions"
              className={`${buttonVariants({ size: "lg" })} gap-2`}
            >
              <Search className="h-4 w-4" /> Browse Tuitions
            </Link>
            <Link
              href="/sign-up"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Become a Tutor
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            Rated 4.8/5 by students and parents
          </div>
        </div>

        <div className="animate-in fade-in zoom-in-95 duration-700">
          <div className="relative h-80 w-full overflow-hidden rounded-3xl border bg-muted shadow-xl md:h-[26rem]">
            <Image
              src="/images/hero.jpg"
              alt="Student learning with a tutor"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
