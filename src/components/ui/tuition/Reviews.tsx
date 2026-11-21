import type { ReviewSummary } from "@/types";
import StarRating from "@/components/ui/shared/StarRating";

async function getReviews(id: string): Promise<ReviewSummary | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applications/reviews/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Reviews({ tuitionId }: { tuitionId: string }) {
  const data = await getReviews(tuitionId);
  if (!data || data.count === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Student Reviews</h2>
        <StarRating value={data.average} />
        <span className="text-sm text-muted-foreground">
          {data.average} ({data.count})
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {data.reviews.map((r) => (
          <div key={r._id} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{r.studentName}</p>
              <StarRating value={r.rating} size={14} />
            </div>
            {r.review && (
              <p className="mt-2 text-sm text-muted-foreground">{r.review}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}