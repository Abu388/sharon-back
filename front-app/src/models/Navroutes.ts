export default interface NavItem {
  title: string;
  href: string;
  description: string;
  children?: NavItem[];
}
export const navigationItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Return to the homepage",
  },
  // {
  //   title: "Dashboard",
  //   href: "/dashboard",
  //   description: "Admin page",
  // },
  {
    title: "Ministry",
    href: "/ministry",
    description: "Our ministry",
  },
  {
    title: "Services",
    href: "/services",
    description: "The services we give",
  },
  {
    title: "Resources",
    href: "/images",
    description: "View Images and books",
    children: [
      {
        title: "Images",
        href: "/images",
        description: "View images",
      },
      {
        title: "Books",
        href: "/books",
        description: "View books",
      },
    ],
  },
  {
    title: "Join Us",
    href: "/join-us",
    description: "Become a member",
  },
];
