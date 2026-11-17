import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  icon?: ReactNode;
};

export default function StatCard({ label, value, icon }: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-card p-5 shadow-sm">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
      {icon && (
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
      )}
    </div>
  );
}