"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { NAV_LINKS } from "@/lib/constants";
import { buttonVariants, Button } from "@/components/ui/button";
import Logo from "@/components/ui/shared/Logo";

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
    `text-sm font-medium transition hover:text-primary ${
      pathname === href ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? null : user ? (
            <>
              <div className="flex items-center gap-2">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="leading-tight">
                  <p className="text-sm font-medium">{user.name}</p>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
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
                className={buttonVariants({ variant: "ghost", size: "sm" })}
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

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={linkClass(l.href)}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center gap-2 border-t pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-medium">{user.name}</p>
                    <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                      {role}
                    </span>
                  </div>
                </div>
                <Link href="/dashboard" onClick={() => setOpen(false)} className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
                <Link href="/dashboard/profile" onClick={() => setOpen(false)} className={linkClass("/dashboard/profile")}>
                  Update Profile
                </Link>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <div className="flex gap-3 border-t pt-4">
                <Link href="/sign-in" onClick={() => setOpen(false)} className={buttonVariants({ variant: "outline" })}>
                  Sign In
                </Link>
                <Link href="/sign-up" onClick={() => setOpen(false)} className={buttonVariants()}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}