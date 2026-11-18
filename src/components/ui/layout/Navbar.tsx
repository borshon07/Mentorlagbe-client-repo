"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { NAV_LINKS } from "@/lib/constants";
import { buttonVariants, Button } from "@/components/ui/button";
import Logo from "@/components/ui/shared/Logo";
import ThemeToggle from "@/components/ui/layout/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user;
  const role = (user as { role?: string } | undefined)?.role ?? "student";

  const handleSignOut = async () => {
    await signOut();
    clearToken();
    toast.success("Signed out");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const linkClass = (href: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition xl:px-4 ${
      pathname === href
        ? "bg-primary/15 text-primary ring-1 ring-primary/20"
        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
    }`;

  const mobileLinkClass = (href: string) =>
    `rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      pathname === href
        ? "bg-primary/15 text-primary"
        : "text-foreground/70 hover:bg-foreground/5"
    }`;

  const avatar = (size: string, px: number) =>
    user?.image ? (
      <Image
        src={user.image}
        alt={user.name}
        width={px}
        height={px}
        unoptimized
        className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white/60 dark:ring-white/20`}
      />
    ) : (
      <span
        className={`${size} flex shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-2 ring-white/60 dark:ring-white/20`}
      >
        {user?.name.charAt(0).toUpperCase()}
      </span>
    );

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/55 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-transparent dark:from-white/10 dark:via-transparent" />
          <div className="pointer-events-none absolute -top-10 left-1/4 h-20 w-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex h-16 items-center justify-between gap-3 px-3 sm:px-5">
            <Logo />

            {/* Desktop links (lg+) */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop actions (lg+) */}
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              {isPending ? null : user ? (
                <>
                  <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/40 py-1 pl-1 pr-3 backdrop-blur dark:border-white/10 dark:bg-white/5">
                    {avatar("h-8 w-8", 32)}
                    <div className="max-w-[110px] leading-tight">
                      <p className="truncate text-xs font-semibold">{user.name}</p>
                      <span className="text-[9px] font-bold uppercase tracking-wide text-primary">
                        {role}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className={`${buttonVariants({ variant: "ghost", size: "sm" })} hidden xl:inline-flex`}
                  >
                    Update Profile
                  </Link>
                  <Button size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    Sign In
                  </Link>
                  <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile + tablet (below lg) */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/40 bg-white/40 backdrop-blur dark:border-white/10 dark:bg-white/5"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="relative max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-white/30 px-4 py-4 dark:border-white/10 lg:hidden">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={mobileLinkClass(l.href)}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}

                {user ? (
                  <>
                    <div className="mt-3 flex items-center gap-3 border-t border-white/30 pt-4 dark:border-white/10">
                      {avatar("h-10 w-10", 40)}
                      <div className="min-w-0 leading-tight">
                        <p className="truncate text-sm font-medium">{user.name}</p>
                        <span className="text-[10px] font-bold uppercase text-primary">
                          {role}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className={mobileLinkClass("/dashboard")}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setOpen(false)}
                      className={mobileLinkClass("/dashboard/profile")}
                    >
                      Update Profile
                    </Link>
                    <Button className="mt-2 w-full" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/30 pt-4 dark:border-white/10">
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className={`${buttonVariants({ variant: "outline" })} w-full`}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className={`${buttonVariants()} w-full`}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}