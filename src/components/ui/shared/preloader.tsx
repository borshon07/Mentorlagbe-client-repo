"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const STORAGE_KEY = "mentorlagbe-preloader-seen";
const DURATION = 1800; // ms

export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
  let seen = false;
  try {
    seen = sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {}

  if (!seen) document.body.style.overflow = "hidden";

  // Age dekhe thakle 0ms e hide, nahole normal duration
  const delay = seen ? 0 : reduce ? 600 : DURATION;

  const timer = setTimeout(() => {
    setShow(false);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }, delay);

  return () => {
    clearTimeout(timer);
    document.body.style.overflow = "";
  };
}, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading MentorLagbe"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#101828]"
        >
          {/* soft orange glow */}
          <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-[#FF7849]/20 blur-3xl" />

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo badge */}
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FF8A5C] to-[#F2612E] shadow-2xl shadow-[#F2612E]/40"
            >
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-3xl border-2 border-[#FF7849]"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <GraduationCap className="h-10 w-10 text-white" />
            </motion.div>

            {/* Brand name */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-3xl font-extrabold tracking-tight text-white"
            >
              Mentor<span className="text-[#FF7849]">Lagbe</span>
            </motion.p>

            {/* Progress bar */}
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduce ? 0.5 : DURATION / 1000,
                  ease: "easeInOut",
                }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#FF8A5C] to-[#F2612E]"
              />
            </div>

            <p className="text-xs tracking-wide text-white/60">
              Finding your perfect tutor...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}