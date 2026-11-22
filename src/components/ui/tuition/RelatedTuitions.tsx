import type { PaginatedTuitions } from "@/types";
import TuitionCard from "@/components/ui/tuition/TuitionCard";

async function getRelated(subject: string, currentId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tuitions?subject=${encodeURIComponent(subject)}&limit=4`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const data: PaginatedTuitions = await res.json();
    return data.data.filter((t) => t._id !== currentId).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function RelatedTuitions({
  subject,
  currentId,
}: {
  subject: string;
  currentId: string;
}) {
  const items = await getRelated(subject, currentId);
  if (items.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold">More {subject} tuitions</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        You might also like these.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <TuitionCard key={t._id} tuition={t} />
        ))}
      </div>
    </section>
  );
}