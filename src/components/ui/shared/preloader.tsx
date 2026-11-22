
"use client";

import { useEffect, useState } from "react";
import styles from "@components/ui/shared/preloader.module.css";

const letters = Array.from("MentorLagbe");

export default function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 9400);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${
        exiting ? styles.exit : ""
      }`}
      role="status"
      aria-label="Loading MentorLagbe"
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className={styles.letter}
              style={{
                animationDelay: `${index * 0.13}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className={styles.network}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className={styles.tagline}>
          Connecting you with the right mentor.
        </p>

        <div className={styles.progress}>
          <div className={styles.progressFill} />
        </div>

        <span className={styles.loadingText}>
          Preparing your journey...
        </span>
      </div>
    </div>
  );
}
