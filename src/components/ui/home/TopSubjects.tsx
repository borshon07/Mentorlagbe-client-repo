import Link from "next/link";
import { Calculator, Atom, Code2, Languages, FlaskConical, Laptop } from "lucide-react";

const SUBJECTS = [
  { name: "Math", icon: Calculator },
  { name: "Physics", icon: Atom },
  { name: "Programming", icon: Code2 },
  { name: "IELTS", icon: Languages },
  { name: "Chemistry", icon: FlaskConical },
  { name: "ICT", icon: Laptop },
];

const STATS = [
  { value: "1,200+", label: "Verified Tutors" },
  { value: "8,500+", label: "Active Students" },
  { value: "3,000+", label: "Tuition Batches" },
  { value: "4.8/5", label: "Average Rating" },
];

export default function TopSubjects() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Popular Subjects</h2>
        <p className="mt-2 text-muted-foreground">Explore what students learn most.</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {SUBJECTS.map((s) => (
          <Link
            key={s.name}
            href="/tuitions"
            className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-6 w-6" />
            </span>
            <span className="text-sm font-semibold">{s.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl bg-primary p-8 text-primary-foreground lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm opacity-80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}