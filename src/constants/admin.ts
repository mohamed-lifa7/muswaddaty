import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "BarChartHorizontal",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "Users",
    label: "user",
  },
  {
    title: "Documents",
    href: "/admin/documents",
    icon: "Files",
    label: "documents",
  },
];
