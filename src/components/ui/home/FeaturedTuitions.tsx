import Link from "next/link";
import type { Tuition } from "@/types";
import TuitionCard from "@/components/ui/tuition/TuitionCard";
import Reveal from "@/components/ui/shared/Reveal";
import SectionHeading from "@/components/ui/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";

async function getLatest(): Promise<Tuition[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/latest`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function FeaturedTuitions() {
  const tuitions = await getLatest();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          align="left"
          eyebrow="Featured"
          title="Featured Tuitions"
          subtitle="Latest approved batches and mentorship offers."
        />
        <Link href="/tuitions" className={buttonVariants({ variant: "outline" })}>
          View All
        </Link>
      </div>

      {tuitions.length === 0 ? (
        <div className="glass mt-10 rounded-2xl p-10 text-center text-muted-foreground">
          No tuitions available right now. Please check back soon.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((t, i) => (
            <Reveal key={t._id} delay={(i % 3) * 90} className="h-full">
              <TuitionCard tuition={t} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}