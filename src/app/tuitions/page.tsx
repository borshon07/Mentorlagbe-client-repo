import BrowseClient from "@/components/ui/tuition/BrowseClient";

type SP = Promise<Record<string, string | undefined>>;

export default async function BrowseTuitionsPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = await searchParams;

  return (
    <BrowseClient
      initial={{
        search: sp.search ?? "",
        subject: sp.subject ?? "",
        classLevel: sp.classLevel ?? "",
        mode: sp.mode === "Online" || sp.mode === "Offline" ? sp.mode : "",
        location: sp.location ?? "",
      }}
    />
  );
}