import { Star, Quote } from "lucide-react";
import Reveal from "@/components/ui/shared/Reveal";
import SectionHeading from "@/components/ui/shared/SectionHeading";

const ITEMS = [
  { name: "Nusrat Jahan", role: "HSC Student", text: "I found a Physics batch within a day. Applying and tracking the status was really easy." },
  { name: "Rakib Hasan", role: "Tutor", text: "Posting my batches and managing applicants from one dashboard saved me a lot of time." },
  { name: "Farhana Akter", role: "Parent", text: "Verified tutors and clear monthly fees helped us decide quickly without any confusion." },
];

export default function Testimonials() {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Users Say"
          subtitle="Real feedback from students, parents and tutors."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ITEMS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="h-full">
              <div className="glass flex h-full flex-col rounded-2xl p-6">
                <Quote className="h-7 w-7 text-primary/40" />
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-[#e9c9a5] text-[#e9c9a5]" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="btn-accent flex h-10 w-10 items-center justify-center rounded-full font-semibold">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}