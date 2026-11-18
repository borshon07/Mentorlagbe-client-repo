export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="h-4 w-80 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-16 animate-pulse rounded-2xl bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </main>
  );
}