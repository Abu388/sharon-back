import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/models/Navroutes";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="hidden space-x-6 font-[poppins] md:inline-flex">
      {navigationItems.slice(0,-1).map((item, index) =>
        item.children ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-black bg-transparent">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-full">
                  {item.children.map((child, childIndex) => (
                    <NavLink
                      key={childIndex}
                      to={child.href || "#"}
                      className={({ isActive }) =>
                        cn(
                          "hover:bg-accent flex w-full items-center rounded-md px-6 py-2 text-sm",
                          isActive && "bg-neutral-300 text-black",
                        )
                      }
                    >
                      {child.title}
                    </NavLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <NavLink
            key={index}
            to={item.href || "#"}
            className={({ isActive }) =>
              cn(
                "hover:bg-accent flex w-full items-center rounded-md px-4 py-2 text-sm hover:text-black",
                isActive && "bg-neutral-200 text-black",
              )
            }
          >
            {item.title}
          </NavLink>
        ),
      )}
    </nav>
  );
};

export default Nav;
