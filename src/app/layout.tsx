import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Hind_Siliguri } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/ui/layout/Navbar";
import Footer from "@/components/ui/layout/Footer";
import ThemeProvider from "@/components/ui/layout/themeProvider";
import Preloader from "@/components/ui/shared/preloader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
});

export const metadata: Metadata = {
  title: "MentorLagbe | Find Your Ideal Tutor",
  description: "Smart tuition and mentorship platform",
  icons: {
    icon: "/mentorlagbe.svg",
  },
};

// Ager dekhe thakle preloader paint er age-i hide kore dey
const hidePreloaderCss =
  "html[data-pl-seen] [data-preloader]{display:none!important}";
const seenScript = `(function(){try{if(sessionStorage.getItem("mentorlagbe-preloader-seen")==="1")document.documentElement.setAttribute("data-pl-seen","")}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${hind.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: hidePreloaderCss }} />
        <script dangerouslySetInnerHTML={{ __html: seenScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Preloader />
        <ThemeProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}