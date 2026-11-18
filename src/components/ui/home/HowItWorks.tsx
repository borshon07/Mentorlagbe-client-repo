import { UserPlus, Search, Send, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "Create an account", text: "Sign up as a student or a tutor in under a minute." },
  { icon: Search, title: "Search or post", text: "Students filter tuitions. Tutors post batches with a banner." },
  { icon: Send, title: "Apply and manage", text: "Students apply. Tutors review every applicant." },
  { icon: CheckCircle2, title: "Start learning", text: "Accepted students begin classes with their tutor." },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How MentorLagbe Works</h2>
          <p className="mt-2 text-muted-foreground">
            Four simple steps from search to first class.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="relative flex h-full flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm"
            >
              <span className="absolute -top-3 left-4 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}