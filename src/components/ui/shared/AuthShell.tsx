import Link from "next/link";
import { CheckCircle2, GraduationCap } from "lucide-react";

type Props = {
  children: React.ReactNode;
  heading: React.ReactNode;
  points: string[];
};

export default function AuthShell({ children, heading, points }: Props) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-stretch gap-6 px-4 py-8 lg:grid-cols-2">
      <section className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-[#101828] via-[#17233b] to-[#22345a] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#e9c9a5]/15 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2">
          <span className="btn-accent flex h-10 w-10 items-center justify-center rounded-xl">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold">MentorLagbe</span>
        </Link>

        <div className="relative space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight">{heading}</h2>
          <ul className="space-y-3 text-white/80">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">
          &copy; 2026 MentorLagbe. All rights reserved.
        </p>
      </section>

      <section className="flex items-center justify-center">
        <div className="glass-strong w-full max-w-md rounded-3xl p-8">{children}</div>
      </section>
    </main>
  );
}