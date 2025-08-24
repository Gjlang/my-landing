// src/app/config/navigation.ts
export type NavLink = { label: string; href: string; ariaLabel: string };
export type NavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
};

export const navigationItems = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#ffffff",
    links: [
      { label: "Company", href: "/company", ariaLabel: "About Company" },
      { label: "Careers", href: "/careers", ariaLabel: "About Careers" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#ffffff",
    links: [
      { label: "Featured", href: "/projects/featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", href: "/projects/case-studies", ariaLabel: "Project Case Studies" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#ffffff",
    links: [
      { label: "Email", href: "mailto:hello@example.com", ariaLabel: "Email us" },
      { label: "Twitter", href: "https://twitter.com/yourhandle", ariaLabel: "Twitter" },
      { label: "LinkedIn", href: "https://linkedin.com/company/yourco", ariaLabel: "LinkedIn" },
    ],
  },
];