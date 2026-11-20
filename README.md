# MentorLagbe (Client)

MentorLagbe is a smart tuition and mentorship platform. Students find verified tutors by subject, class level, mode and district. Tutors post tuition batches and manage applicants. Admins moderate listings, users and payments.

- **Live Site:** <client-live-url>
- **Server Repository:** <server-repo-url>
- **Server API:** <server-live-url>

## Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@mentorlagbe.com | Admin@12345 |
| Tutor (Pro) | tanvir@mentorlagbe.com | Tutor@12345 |
| Student | nusrat@mentorlagbe.com | Student@12345 |

**Stripe test card:** `4242 4242 4242 4242`, any future expiry, CVC `123`.

## Key Features

- Role-based authentication (Student, Tutor, Admin) with BetterAuth and JWT
- Google social login
- Home page with hero search, featured tuitions, pricing, how it works, subjects, testimonials
- Browse Tuitions with server-side search, filters (subject, class level, mode, district) and pagination
- Tuition details with student-only apply form and duplicate application prevention
- Tutor dashboard: post tuition (ImgBB image upload), full CRUD, toggle active/closed, manage applicants
- Student dashboard: stats, my applications with cancel, saved tuitions (bookmarks)
- Admin dashboard: platform stats, user role management, tuition approval, transactions
- Stripe Checkout for Pro plans (Tutor $15, Student $10) with payment records
- Verified Tutor badge for Pro tutors and priority applicants for Pro students
- Free tutors can post 2 tuitions, Pro tutors unlimited
- Profile update with ImgBB image upload
- Dark and light theme, collapsible dashboard sidebar, fully responsive liquid glass UI
- Custom loading, error and 404 pages, toast notifications

## Tech Stack and npm Packages

next, react, typescript, tailwindcss, shadcn, better-auth, react-hook-form, zod, @hookform/resolvers, sonner, framer-motion, next-themes, lucide-react, tw-animate-css

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Purpose |
|---|---|
| NEXT_PUBLIC_API_URL | Server base URL |
| NEXT_PUBLIC_IMGBB_API_KEY | ImgBB upload key |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key |

## Run Locally

    npm install
    npm run dev

Open http://localhost:3000. The server repository must be running on the URL set in `NEXT_PUBLIC_API_URL`.