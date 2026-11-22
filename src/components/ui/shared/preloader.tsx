
"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { GraduationCap } from "lucide-react";

const STORAGE_KEY = "mentorlagbe-preloader-seen";
const DURATION = 10000;

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
const ACCENT = "#FF7849";

const BRAND_NAME = Array.from("MentorLagbe");

export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;

    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}

    if (!seen) {
      document.body.style.overflow = "hidden";
    }

    const delay = seen ? 0 : reduce ? 500 : DURATION;

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
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{
            duration: 0.5,
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
                initial={
                  reduce ? false : { pathLength: 0, opacity: 0 }
                }
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                  ease: "easeInOut",
                }}
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
                  initial={
                    reduce ? false : { pathLength: 0, opacity: 0 }
                  }
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.07,
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
                    initial={{
                      cx: CENTER.x,
                      cy: CENTER.y,
                      opacity: 0,
                    }}
                    animate={{
                      cx: [CENTER.x, n.x],
                      cy: [CENTER.y, n.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.7 + i * 0.12,
                      repeat: Infinity,
                      repeatDelay: 0.25,
                      ease: "easeInOut",
                    }}
                  />
                ))}

              {/* Network Nodes */}
              {NODES.map((n, i) => (
                <motion.g
                  key={`node-${i}`}
                  initial={
                    reduce ? false : { scale: 0, opacity: 0 }
                  }
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                    delay: 0.35 + i * 0.07,
                  }}
                  style={{
                    transformOrigin: `${n.x}px ${n.y}px`,
                  }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 4}
                    fill={ACCENT}
                    fillOpacity={0.12}
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill={ACCENT}
                  />
                </motion.g>
              ))}
            </svg>

            {/* Center Graduation Cap */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={
                  reduce ? false : { scale: 0.6, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
                className="relative"
              >
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-2xl border border-[#FF7849]"
                    animate={{
                      scale: [1, 1.7],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.4,
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
              aria-label="MentorLagbe"
            >
              {BRAND_NAME.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={
                    reduce
                      ? false
                      : {
                          opacity: 0,
                          y: -80,
                          rotate: -12,
                          scale: 0.7,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 180,
                          damping: 13,
                          delay: 0.8 + index * 0.16,
                        }
                  }
                  className={
                    index < 6
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
              initial={
                reduce ? false : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.8,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mt-3 text-sm text-white/60 sm:text-base"
            >
              Connecting you with the right mentor.
            </motion.p>
          </div>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#FF8A5C] to-[#F2612E]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 9.5,
                  delay: 0.5,
                  ease: "linear",
                }}
                style={{ transformOrigin: "left" }}
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
