import Link from "next/link";
import type { Tuition } from "@/types";
import TuitionCard from "@/components/ui/tuition/TuitionCard";
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Featured Tuitions</h2>
          <p className="mt-2 text-muted-foreground">
            Latest approved batches and mentorship offers.
          </p>
        </div>
        <Link href="/tuitions" className={buttonVariants({ variant: "outline" })}>
          View All
        </Link>
      </div>

      {tuitions.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          No tuitions available right now. Please check back soon.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((t) => (
            <TuitionCard key={t._id} tuition={t} />
          ))}
        </div>
      )}
    </section>
  );
}