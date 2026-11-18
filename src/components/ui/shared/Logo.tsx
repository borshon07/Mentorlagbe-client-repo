"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function Logo() {
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center gap-2"
      aria-label="MentorLagbe home"
    >
      <span className="btn-accent flex h-9 w-9 items-center justify-center rounded-xl">
        <GraduationCap className="h-5 w-5" />
      </span>
      <span className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight">
        MentorLagbe
      </span>
    </Link>
  );
}