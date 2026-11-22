"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const STORAGE_KEY = "mentorlagbe-preloader-seen";
const DURATION = 1700; // ms

// Hexagon of "mentor" nodes around the center (viewBox 240x240, center 120,120)
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

export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}

    if (!seen) document.body.style.overflow = "hidden";

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
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#101828] px-6"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#FF7849]/15 blur-3xl sm:h-96 sm:w-96" />

          {/* Network */}
          <div className="relative aspect-square w-60 sm:w-72">
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              {/* Outer ring connecting mentors with each other */}
              <motion.polygon
                points={RING}
                stroke="white"
                strokeOpacity={0.14}
                strokeWidth={1}
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55, ease: "easeInOut" }}
              />

              {/* Spokes: center -> each node */}
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
                    duration: 0.5,
                    delay: 0.1 + i * 0.07,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Pulses travelling along the spokes */}
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
                      duration: 1,
                      delay: 0.7 + i * 0.12,
                      repeat: Infinity,
                      repeatDelay: 0.25,
                      ease: "easeInOut",
                    }}
                  />
                ))}

              {/* Nodes */}
              {NODES.map((n, i) => (
                <motion.g
                  key={`node-${i}`}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                    delay: 0.35 + i * 0.07,
                  }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                >
                  <circle cx={n.x} cy={n.y} r={n.r + 4} fill={ACCENT} fillOpacity={0.12} />
                  <circle cx={n.x} cy={n.y} r={n.r} fill={ACCENT} />
                </motion.g>
              ))}
            </svg>

            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
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

          {/* Brand + tagline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
            className="mt-6 text-center"
          >
            <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Mentor<span className="text-[#FF7849]">Lagbe</span>
            </p>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Connecting you with the right mentor.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}