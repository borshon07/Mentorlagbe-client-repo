"use client";

import { Menu } from "lucide-react";

type Props = {
  name: string;
  email: string;
  role: string;
  plan?: string;
  image?: string | null;
  onToggle: () => void;
};

export default function Topbar({ name, email, role, plan, image, onToggle }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur">
      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="rounded-lg border p-2 hover:bg-muted"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="flex flex-col items-start gap-1">
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase">
            {role}
          </span>
          {plan === "pro" && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-700">
              Pro
            </span>
          )}
        </div>
      </div>
    </header>
  );
}