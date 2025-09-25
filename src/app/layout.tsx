// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// ✅ IMPORT MENU BARU
import StaggeredMenu, {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from "@/components/StaggeredMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Uncu Worklabs",
  description: "A Creative Lab for Digital Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ✅ Pakai struktur item StaggeredMenu
  const menuItems: StaggeredMenuItem[] = [
    { label: "Home", ariaLabel: "Go to Home", link: "/" },
    { label: "About", ariaLabel: "Go to About page", link: "/about" },
    { label: "Projects", ariaLabel: "Go to Projects", link: "/projects" },
    { label: "Services", ariaLabel: "Go to Services", link: "/services" },
    { label: "Contact", ariaLabel: "Go to Contact section", link: "/#contact" }, // anchor di home
    { label: "Login", ariaLabel: "Login to your account", link: "/login" },
  ];

  const socials: StaggeredMenuSocialItem[] = [
    { label: "LinkedIn", link: "https://linkedin.com" },
    { label: "Instagram", link: "https://instagram.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "Dribbble", link: "https://dribbble.com" },
    { label: "Substack", link: "https://substack.com" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased min-h-screen`}
      >
        <Providers>
          {/* ✅ GANTI DENGAN STAGGERED MENU */}
          <StaggeredMenu
            position="left"
            colors={["#22255b", "#4bbbed", "#d33831"]}
            accentColor="#4bbbed"
            logoUrl="/logo2.png"
            items={menuItems}
            socialItems={socials}
            displaySocials
            displayItemNumbering
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen
          />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
