import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/shared/Logo";
import { NAV_LINKS } from "@/lib/constants";

type IconProps = { className?: string };

function XIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.931-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Footer() {
  const social = [
    { label: "X", href: "https://x.com", icon: <XIcon className="h-4 w-4" /> },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: <FacebookIcon className="h-4 w-4" />,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: <LinkedinIcon className="h-4 w-4" />,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: <GithubIcon className="h-4 w-4" />,
    },
  ];

  return (
    <footer className="mt-16 border-t border-border bg-gradient-to-b from-transparent to-[#101828]/5 dark:to-white/5">
      {" "}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-3 md:gap-10 md:py-12">
        <div className="col-span-2 min-w-0 space-y-4 md:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Find verified tutors and mentorship batches by subject, class level
            and budget, all in one place.
          </p>
          <div className="flex gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:bg-primary hover:text-primary-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              ...NAV_LINKS,
              { label: "Dashboard", href: "/dashboard" },
              { label: "Sign In", href: "/sign-in" },
              { label: "Sign Up", href: "/sign-up" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2 break-all">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />{" "}
              support@mentorlagbe.com
            </li>
            <li className="flex items-center gap-2 break-all">
              <Phone className="h-4 w-4" /> +880 1700 000000
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        &copy; 2026 MentorLagbe. All rights reserved.
      </div>
    </footer>
  );
}
