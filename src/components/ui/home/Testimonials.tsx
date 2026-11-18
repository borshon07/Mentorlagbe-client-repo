import { Star } from "lucide-react";

const ITEMS = [
  { name: "Nusrat Jahan", role: "HSC Student", text: "I found a Physics batch within a day. Applying and tracking the status was really easy." },
  { name: "Rakib Hasan", role: "Tutor", text: "Posting my batches and managing applicants from one dashboard saved me a lot of time." },
  { name: "Farhana Akter", role: "Parent", text: "Verified tutors and clear monthly fees helped us decide quickly without any confusion." },
];

export default function Testimonials() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="mt-2 text-muted-foreground">Real feedback from students, parents and tutors.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ITEMS.map((t) => (
            <div key={t.name} className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}