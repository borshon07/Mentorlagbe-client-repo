"use client";

import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const user = session?.user;
  const role = (user as { role?: string } | undefined)?.role ?? "student";

  // Home er top e transparent, baki shob jaygay glass
  const transparent = pathname === "/" && !scrolled && !open;

  const handleSignOut = async () => {
    await signOut();
    clearToken();
    toast.success("Signed out");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const linkClass = (href: string) => {
    const active = pathname === href;
    if (transparent) {
      return `rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
        active
          ? "bg-white/15 text-white ring-1 ring-white/30"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`;
    }
    return `rounded-full px-3 py-2 text-sm font-medium transition xl:px-4 ${
      active
        ? "bg-primary/12 text-primary ring-1 ring-primary/25"
        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
    }`;
  };

  const mobileLinkClass = (href: string) =>
    `rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      pathname === href
        ? "bg-primary/12 text-primary"
        : "text-foreground/70 hover:bg-foreground/5"
    }`;

  const outlineBtn = transparent
    ? "inline-flex h-8 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
    : buttonVariants({ variant: "outline", size: "sm" });

  const ghostBtn = transparent
    ? "hidden h-8 items-center justify-center rounded-lg px-3 text-sm font-medium text-white/85 transition hover:bg-white/10 xl:inline-flex"
    : `${buttonVariants({ variant: "ghost", size: "sm" })} hidden xl:inline-flex`;

  const avatar = (size: string, px: number) =>
    user?.image ? (
      <Image
        src={user.image}
        alt={user.name}
        width={px}
        height={px}
        unoptimized
        className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white/70 dark:ring-white/20`}
      />
    ) : (
      <span
        className={`${size} btn-accent flex shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-2 ring-white/70 dark:ring-white/20`}
      >
        {user?.name.charAt(0).toUpperCase()}
      </span>
    );

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="relative mx-auto max-w-7xl">
        <div
          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
            transparent
              ? "border-white/15 bg-transparent text-white"
              : "glass-strong border-transparent"
          }`}
        >
          {!transparent && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent dark:from-white/8" />
              <div className="pointer-events-none absolute -top-12 right-10 h-24 w-1/3 rounded-full bg-primary/15 blur-3xl" />
            </>
          )}

          <div className="relative flex h-16 items-center justify-between gap-3 px-3 sm:px-5">
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              {isPending ? null : user ? (
                <>
                  <div
                    className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 ${
                      transparent
                        ? "border border-white/25 bg-white/10 backdrop-blur"
                        : "glass"
                    }`}
                  >
                    {avatar("h-8 w-8", 32)}
                    <div className="max-w-[110px] leading-tight">
                      <p className="truncate text-xs font-semibold">{user.name}</p>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wide ${
                          transparent ? "text-[#E9C9A5]" : "text-primary"
                        }`}
                      >
                        {role}
                      </span>
                    </div>
                  </div>
                  <Link href="/dashboard" className={outlineBtn}>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/profile" className={ghostBtn}>
                    Update Profile
                  </Link>
                  <Button size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className={outlineBtn}>
                    Sign In
                  </Link>
                  <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  transparent ? "border border-white/25 bg-white/10 backdrop-blur" : "glass"
                }`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="relative max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-border px-4 py-4 lg:hidden">
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
                    <div className="mt-3 flex items-center gap-3 border-t border-border pt-4">
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
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-4">
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