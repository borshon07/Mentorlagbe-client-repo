"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import Topbar from "@/components/ui/dashboard/Topbar";

type SessionUser = {
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  plan?: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    );
  }

  const user = session.user as SessionUser;
  const role = (user.role as "student" | "tutor" | "admin") || "student";

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      setDesktopCollapsed((v) => !v);
    } else {
      setMobileOpen((v) => !v);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full">
      <Sidebar
        role={role}
        mobileOpen={mobileOpen}
        desktopCollapsed={desktopCollapsed}
        onClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          name={user.name}
          email={user.email}
          role={role}
          plan={user.plan}
          image={user.image}
          onToggle={handleToggle}
        />
        <main className="flex-1 bg-muted/30 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}