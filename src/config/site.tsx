import { Gauge, type LucideIcon, MessagesSquare } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "POWERBAND",
  description: "POWERBAND Team Dashboard",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: MessagesSquare,
    name: "Roster",
    href: "/roster",
  },
   {
    icon: Dumbbell,
    name: "Workouts",
    href: "/workouts",
  },
];
