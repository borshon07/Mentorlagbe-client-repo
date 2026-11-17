"use client";

import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data, isPending } = useSession();

  if (isPending) return <p>Loading...</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>MentorLagbe</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}