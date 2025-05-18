import { Gauge, type LucideIcon, Users, Dumbbell, ClipboardList, MessagesSquare } from "lucide-react";

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
    icon: Users,
    name: "Roster",
    href: "/roster",
  },
   {
    icon: Dumbbell,
    name: "Workouts",
    href: "/workouts",
  },
   {
    icon: ClipboardList,
    name: "Attendance",
    href: "/attendance",
  },
   {
    icon: MessagesSquare,
    name: "Messages",
    href: "/messages",
  },
];
