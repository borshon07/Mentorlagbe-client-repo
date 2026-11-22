import { UserPlus, Search, Send, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/shared/Reveal";
import SectionHeading from "@/components/ui/shared/SectionHeading";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create an account",
    text: "Sign up as a student or a tutor in under a minute.",
  },
  {
    icon: Search,
    title: "Search or post",
    text: "Students filter tuitions. Tutors post batches with a banner.",
  },
  {
    icon: Send,
    title: "Apply and manage",
    text: "Students apply. Tutors review every applicant.",
  },
  {
    icon: CheckCircle2,
    title: "Start learning",
    text: "Accepted students begin classes with their tutor.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#17233b]/5 to-transparent dark:via-white/[0.03]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Process"
          title="How MentorLagbe Works"
          subtitle="Four simple steps from search to first class."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="h-full">
              {/* wrapper: badge ekhane, card er bahire, tai clip hobe na */}
              <div className="relative h-full pt-3">
                <span className="btn-accent absolute left-5 top-0 z-10 rounded-full px-2.5 py-0.5 text-xs font-bold">
                  {i + 1}
                </span>

                <div className="glass liquid-card group relative flex h-full flex-col items-center rounded-2xl p-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101828] text-[#e9c9a5] transition group-hover:scale-105 dark:bg-[#e9c9a5] dark:text-[#101828]">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}