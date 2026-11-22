"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

// Configuration
const STORAGE_KEY = "mentorlagbe-preloader-seen";

const DURATION = 3500;
const EXIT_DURATION = 500;
const DISPLAY_DURATION = DURATION - EXIT_DURATION;
const BAR_DELAY = 0.2;
const BAR_DURATION = DISPLAY_DURATION / 1000 - BAR_DELAY;

const ACCENT = "#FF7849";
const CENTER = { x: 120, y: 120 };

const NODES = [
  { x: 120, y: 40, r: 5 },
  { x: 189.3, y: 80, r: 4 },
  { x: 189.3, y: 160, r: 5 },
  { x: 120, y: 200, r: 4 },
  { x: 50.7, y: 160, r: 5 },
  { x: 50.7, y: 80, r: 4 },
];
const RING = NODES.map((n) => `${n.x},${n.y}`).join(" ");

const BRAND_FIRST = "Mentor";
const BRAND_NAME = Array.from("MentorLagbe");

// External store for session-based visibility
const listeners = new Set<() => void>();
// storage fail korleo preloader jate atke na thake
let dismissed = false;

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  if (dismissed) return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

// true: server HTML e preloader thakbe, tai home page flash korbe na
function getServerSnapshot() {
  return true;
}

function dismiss() {
  dismissed = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
  listeners.forEach((callback) => callback());
}

export default function Preloader() {
  const reduce = useReducedMotion();
  const show = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!show) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(dismiss, reduce ? 500 : DISPLAY_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          data-preloader
          role="status"
          aria-label="Loading MentorLagbe"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{
            duration: EXIT_DURATION / 1000,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#101828] px-6"
        >
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#FF7849]/15 blur-3xl sm:h-96 sm:w-96" />

          {/* Mentor Network */}
          <div className="relative aspect-square w-60 sm:w-72">
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              {/* Outer Ring */}
              <motion.polygon
                points={RING}
                stroke="white"
                strokeOpacity={0.14}
                strokeWidth={1}
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
              />

              {/* Connecting Lines */}
              {NODES.map((n, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={n.x}
                  y2={n.y}
                  stroke={ACCENT}
                  strokeOpacity={0.45}
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.05,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Traveling Pulses */}
              {!reduce &&
                NODES.map((n, i) => (
                  <motion.circle
                    key={`pulse-${i}`}
                    r={2.5}
                    fill="#FFB38F"
                    initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
                    animate={{
                      cx: [CENTER.x, n.x],
                      cy: [CENTER.y, n.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.5 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}

              {/* Network Nodes */}
              {NODES.map((n, i) => (
                <motion.g
                  key={`node-${i}`}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                    delay: 0.2 + i * 0.05,
                  }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 4}
                    fill={ACCENT}
                    fillOpacity={0.12}
                  />
                  <circle cx={n.x} cy={n.y} r={n.r} fill={ACCENT} />
                </motion.g>
              ))}
            </svg>

            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  delay: 0.1,
                }}
                className="relative"
              >
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-2xl border border-[#FF7849]"
                    animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.3,
                    }}
                  />
                )}

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF8A5C] to-[#F2612E] shadow-xl shadow-[#F2612E]/40 sm:h-[4.5rem] sm:w-[4.5rem]">
                  <GraduationCap className="h-8 w-8 text-white sm:h-9 sm:w-9" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated Brand Name */}
          <div className="mt-6 text-center">
            <div
              className="flex items-center justify-center text-2xl font-extrabold tracking-tight sm:text-3xl"
              role="img"
              aria-label="MentorLagbe"
            >
              {BRAND_NAME.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, y: -60, rotate: -12, scale: 0.7 }
                  }
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 200,
                          damping: 14,
                          delay: 0.3 + index * 0.07,
                        }
                  }
                  className={
                    index < BRAND_FIRST.length
                      ? "inline-block text-white"
                      : "inline-block text-[#FF7849]"
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
              className="mt-3 text-sm text-white/60 sm:text-base"
            >
              Connecting you with the right mentor.
            </motion.p>
          </div>

          {/* Loading Indicator */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#FF8A5C] to-[#F2612E]"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduce ? 0.4 : BAR_DURATION,
                  delay: reduce ? 0 : BAR_DELAY,
                  ease: "linear",
                }}
              />
            </div>

            <p className="mt-3 text-[11px] tracking-[2px] text-white/40">
              PREPARING YOUR JOURNEY...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}