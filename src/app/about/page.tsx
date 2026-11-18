import HowItWorks from "@/components/ui/home/HowItWorks";
import Testimonials from "@/components/ui/home/Testimonials";

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">About MentorLagbe</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          MentorLagbe connects students and parents with qualified tutors by
          subject, class level, mode and budget. Tutors get a simple place to
          showcase their batches and manage enrollments.
        </p>
      </section>
      <HowItWorks />
      <Testimonials />
    </main>
  );
}