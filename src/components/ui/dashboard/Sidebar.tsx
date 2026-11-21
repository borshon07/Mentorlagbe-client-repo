"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  FileText,
  Bookmark,
  UserCog,
  PlusCircle,
  BookOpen,
  Users,
  CheckSquare,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { DASHBOARD_LINKS } from "@/lib/constants";

type Props = {
  role: "student" | "tutor" | "admin";
  mobileOpen: boolean;
  desktopCollapsed: boolean;
  onClose: () => void;
};

const ICONS: Record<string, LucideIcon> = {
  Overview: LayoutDashboard,
  "My Applications": FileText,
  "Saved Tuitions": Bookmark,
  "Update Profile": UserCog,
  "Post a Tuition": PlusCircle,
  "My Tuitions": BookOpen,
  Applicants: Users,
  Users: Users,
  Tuitions: CheckSquare,
  Transactions: CreditCard,
};

export default function Sidebar({
  role,
  mobileOpen,
  desktopCollapsed,
  onClose,
}: Props) {
  const pathname = usePathname();
  const links = DASHBOARD_LINKS[role];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[4.75rem] z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-[4.75rem] z-40 w-64 shrink-0 overflow-y-auto border-r bg-background/95 backdrop-blur-xl transition-all duration-200 lg:static lg:z-auto lg:bg-background/70 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          desktopCollapsed
            ? "lg:w-0 lg:-translate-x-full lg:overflow-hidden lg:border-r-0"
            : "lg:w-64 lg:translate-x-0"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {role} Menu
          </p>
          <button
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {links.map((l) => {
            const active = pathname === l.href;
            const Icon = ICONS[l.label] ?? LayoutDashboard;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    active ? "" : "group-hover:text-primary"
                  }`}
                />
                {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
