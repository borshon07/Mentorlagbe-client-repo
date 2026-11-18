import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  icon?: ReactNode;
};

export default function StatCard({ label, value, icon }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        {icon && (
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}