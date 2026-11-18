import Link from "next/link";
import { Calculator, Atom, Code2, Languages, FlaskConical, Laptop } from "lucide-react";
import Reveal from "@/components/ui/shared/Reveal";
import SectionHeading from "@/components/ui/shared/SectionHeading";

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
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionHeading
        eyebrow="Subjects"
        title="Popular Subjects"
        subtitle="Explore what students learn most."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {SUBJECTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 70} className="h-full">
            <Link
              href="/tuitions"
              className="glass group flex h-full flex-col items-center gap-3 rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">{s.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101828] via-[#17233b] to-[#22345a] p-8 text-white shadow-xl md:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-[#e9c9a5] md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}