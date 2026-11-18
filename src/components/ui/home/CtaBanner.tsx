import Link from "next/link";
import Reveal from "@/components/ui/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center md:p-14">
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[#17233b]/25 blur-3xl dark:bg-blue-500/25" />
          <h2 className="relative text-3xl font-bold tracking-tight md:text-4xl">
            Ready to start learning or teaching?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
            Join MentorLagbe today and connect with the right people in minutes.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
              Get Started Free
            </Link>
            <Link href="/tuitions" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Browse Tuitions
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}