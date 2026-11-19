"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Wifi,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SUBJECTS, DISTRICTS } from "@/lib/constants";

const fieldClass =
  "h-12 w-full appearance-none rounded-xl border border-border bg-white/70 pl-11 pr-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring dark:bg-white/5";

const TYPE_TO_MODE: Record<string, string> = {
  online: "Online",
  home: "Offline",
  both: "",
};

export default function Hero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [subject, setSubject] = useState("");
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("both");

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (district) params.set("location", district);
    if (TYPE_TO_MODE[type]) params.set("mode", TYPE_TO_MODE[type]);
    const qs = params.toString();
    router.push(qs ? `/tuitions?${qs}` : "/tuitions");
  };

  return (
    // -mt-20: navbar er pichone porjonto image jabe
    <section className="relative -mt-20 min-h-[46rem] overflow-hidden bg-[#101828]">
      {/* Full-bleed background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Students learning with a tutor"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Halka navy overlay: image dekha jabe, text o readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101828]/80 via-[#101828]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/75 via-transparent to-[#0B1020]/35" />
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-[#FF7849]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-36 md:pt-44">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* LEFT */}
          <div className="space-y-7">
            <motion.span
              {...enter(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E9C9A5] backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF7849]" />
              Your learning journey starts here
            </motion.span>

            <motion.h1
              {...enter(0.1)}
              className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Find Your Perfect Tutor.
              <br />
              <span className="bg-gradient-to-r from-[#FF8A5C] to-[#F2612E] bg-clip-text text-transparent">
                Unlock Your Potential.
              </span>
            </motion.h1>

            <motion.p
              {...enter(0.2)}
              className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
            >
              Connect with experienced, verified tutors for personalized online and
              home tuition. Find the right guidance to achieve your academic goals.
            </motion.p>

            <motion.div {...enter(0.3)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
              >
                <Link
                  href="/tuitions"
                  className="btn-accent inline-flex w-full items-center justify-between gap-4 rounded-full py-2 pl-7 pr-2 text-sm font-bold uppercase tracking-wider sm:w-auto"
                >
                  Find a Tutor
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#F2612E]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
              >
                <Link
                  href="/sign-up"
                  className={`${buttonVariants({ size: "lg", variant: "outline" })} w-full rounded-full border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white sm:w-auto`}
                >
                  Become a Tutor
                </Link>
              </motion.div>
            </motion.div>

            <motion.ul
              {...enter(0.4)}
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80"
            >
              {[
                { icon: ShieldCheck, label: "Verified Tutors" },
                { icon: Wifi, label: "Flexible Learning" },
                { icon: MapPin, label: "Across Bangladesh" },
              ].map((t) => (
                <li key={t.label} className="flex items-center gap-2">
                  <t.icon className="h-4 w-4 text-[#FF7849]" />
                  {t.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT: floating glass cards (desktop only) */}
          <div className="hidden justify-self-end lg:block">
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-72 space-y-3"
            >
              <div className="rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="btn-accent flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                    T
                  </span>
                  <div className="leading-tight text-white">
                    <p className="flex items-center gap-1 text-sm font-semibold">
                      Tanvir Ahmed <BadgeCheck className="h-4 w-4 text-[#FF7849]" />
                    </p>
                    <p className="text-xs text-white/70">HSC Physics · Dhaka</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#E9C9A5]">
                      ৳3,500 / month
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/12 px-4 py-3 backdrop-blur-xl">
                <Star className="h-5 w-5 fill-[#E9C9A5] text-[#E9C9A5]" />
                <div className="leading-tight text-white">
                  <p className="text-lg font-bold">4.9</p>
                  <p className="text-[11px] text-white/70">Student rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SEARCH PANEL */}
        <motion.form
          onSubmit={handleSearch}
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.5, ease: "easeOut" as const },
              })}
          className="glass-strong relative mt-14 rounded-3xl p-5 md:p-7"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold md:text-xl">
            <GraduationCap className="h-5 w-5 text-[#FF7849]" />
            Find the right tutor for your needs
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <div className="relative">
              <label htmlFor="hero-subject" className="sr-only">Subject</label>
              <BookOpen className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#FF7849]" />
              <select
                id="hero-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={fieldClass}
              >
                <option value="">What do you want to learn?</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label htmlFor="hero-district" className="sr-only">District</label>
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#FF7849]" />
              <select
                id="hero-district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={fieldClass}
              >
                <option value="">Select your district</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label htmlFor="hero-type" className="sr-only">Tuition type</label>
              <Wifi className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#FF7849]" />
              <select
                id="hero-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={fieldClass}
              >
                <option value="online">Online Tuition</option>
                <option value="home">Home Tuition</option>
                <option value="both">Both</option>
              </select>
            </div>

            <motion.button
              type="submit"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="btn-accent flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold md:col-span-2 lg:col-span-1"
            >
              <Search className="h-4 w-4" /> Search Tutors <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}