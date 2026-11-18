export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/about" },
];

export const SUBJECTS = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Science",
  "English",
  "IELTS",
  "Programming",
  "ICT",
];

export const CLASS_LEVELS = [
  "Class 6-8",
  "SSC",
  "HSC",
  "O Level",
  "A Level",
  "University",
];
export const DISTRICTS = [
  "Bagerhat","Bandarban","Barguna","Barishal","Bhola","Bogura","Brahmanbaria","Chandpur","Chattogram","Chuadanga",
  "Cox's Bazar","Cumilla","Dhaka","Dinajpur","Faridpur","Feni","Gaibandha","Gazipur","Gopalganj","Habiganj",
  "Jamalpur","Jashore","Jhalokathi","Jhenaidah","Joypurhat","Khagrachhari","Khulna","Kishoreganj","Kurigram","Kushtia",
  "Lakshmipur","Lalmonirhat","Madaripur","Magura","Manikganj","Meherpur","Moulvibazar","Munshiganj","Mymensingh","Naogaon",
  "Narail","Narayanganj","Narsingdi","Natore","Netrokona","Nilphamari","Noakhali","Pabna","Panchagarh","Patuakhali",
  "Pirojpur","Rajbari","Rajshahi","Rangamati","Rangpur","Satkhira","Shariatpur","Sherpur","Sirajganj","Sunamganj",
  "Sylhet","Tangail","Thakurgaon",
];

export const DASHBOARD_LINKS = {
  student: [
    { label: "Overview", href: "/dashboard/student" },
    { label: "My Applications", href: "/dashboard/student/my-applications" },
    { label: "Saved Tuitions", href: "/dashboard/student/saved" },
    { label: "Update Profile", href: "/dashboard/profile" },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor" },
    { label: "Post a Tuition", href: "/dashboard/tutor/post-tuition" },
    { label: "My Tuitions", href: "/dashboard/tutor/my-tuitions" },
    { label: "Applicants", href: "/dashboard/tutor/applicants" },
    { label: "Update Profile", href: "/dashboard/profile" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin" },
    { label: "Users", href: "/dashboard/admin/users" },
    { label: "Tuitions", href: "/dashboard/admin/tuitions" },
    { label: "Transactions", href: "/dashboard/admin/transactions" },
    { label: "Update Profile", href: "/dashboard/profile" },
  ],
} as const;
