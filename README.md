# MentorLagbe (Client)

Smart tuition and mentorship platform connecting students with verified tutors.

**Live Site:** <client-vercel-url>
**Server Repo:** <server-repo-url>

## Test Accounts
| Role | Email | Password |
|---|---|---|
| Admin | admin@mentorlagbe.com | Admin@12345 |
| Tutor (Pro) | tanvir@mentorlagbe.com | Tutor@12345 |
| Student | nusrat@mentorlagbe.com | Student@12345 |

Stripe test card: 4242 4242 4242 4242, any future date, CVC 123.

## Key Features
- Role-based dashboards (Student, Tutor, Admin)
- Server-side search, filter and pagination
- Tutor tuition CRUD with ImgBB image upload
- Admin approval flow, user role management, transactions
- Stripe Pro plan checkout (Tutor $15, Student $10)
- Student apply flow with duplicate prevention
- Saved tuitions, Verified tutor badge, priority applicants
- Dark/Light theme, responsive liquid glass UI

## Tech and Packages
next, react, typescript, tailwindcss, shadcn, better-auth, react-hook-form, zod, sonner, framer-motion, next-themes, lucide-react

## Environment Variables
See `.env.example`.

## Run Locally
npm install && npm run dev