import {
  AudioWaveform,
  BarChart2,
  Briefcase,
  Command,
  FolderTree,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  ListFilter,
  Map,
  MessageSquare,
  Package,
  Percent,
  PieChart,
  Settings,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";

export const sidebarItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Atra Stones",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    // General
    {
      group: "general",
      title: "dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    // {
    //   group: "general",
    //   title: "analytics",
    //   url: "#",
    //   icon: BarChart2,
    // },
    // {
    //   group: "general",
    //   title: "reviews",
    //   url: "#",
    //   icon: MessageSquare,
    // },
    // {
    //   group: "general",
    //   title: "settings",
    //   url: "#",
    //   icon: Settings,
    // },
    // Catalog
    // {
    //   group: "catalog",
    //   title: "categories",
    //   url: "#",
    //   icon: FolderTree,
    //   items: [
    //     { title: "Genesis", url: "#" },
    //     { title: "Explorer", url: "#" },
    //     { title: "Quantum", url: "#" },
    //   ],
    // },
    {
      group: "catalog",
      title: "attributes",
      url: "/attributes",
      icon: ListFilter,
      items: [
        { title: "list", url: "/" },
        { title: "create", url: "/add" },
      ],
    },
    // {
    //   group: "catalog",
    //   title: "tags",
    //   url: "#",
    //   icon: Tags,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //     { title: "Billing", url: "#" },
    //     { title: "Limits", url: "#" },
    //   ],
    // },
    // {
    //   group: "catalog",
    //   title: "products",
    //   url: "#",
    //   icon: Package,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //     { title: "Billing", url: "#" },
    //     { title: "Limits", url: "#" },
    //   ],
    // },
    // {
    //   group: "catalog",
    //   title: "services",
    //   url: "#",
    //   icon: Briefcase,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //     { title: "Billing", url: "#" },
    //     { title: "Limits", url: "#" },
    //   ],
    // },
    // Sales
    // {
    //   group: "sales",
    //   title: "orders",
    //   url: "#",
    //   icon: ShoppingCart,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //   ],
    // },
    // {
    //   group: "sales",
    //   title: "discounts",
    //   url: "#",
    //   icon: Percent,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //   ],
    // },
    // {
    //   group: "sales",
    //   title: "customers",
    //   url: "#",
    //   icon: Users,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //   ],
    // },
  ],
};
