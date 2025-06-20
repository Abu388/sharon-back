import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "react-router-dom";
import NavItem from "@/models/Navroutes";


interface DrawerNavigationProps {
  items: NavItem[];
  className?: string;
}

export function DrawerNavigation({ items, className }: DrawerNavigationProps) {
  const [open, setOpen] = useState(false);
  const [openCollapsibles, setOpenCollapsibles] = useState<
    Record<string, boolean>
  >({});

  const toggleCollapsible = (title: string) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Menu className="size-8 " />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </div>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {items.map((item, index) =>
              item.children ? (
                <Collapsible
                  key={index}
                  open={openCollapsibles[item.title]}
                  onOpenChange={() => toggleCollapsible(item.title)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full px-4 py-8 justify-between"
                    >
                      <div className="inline-flex flex-col items-start">
                        {item.title}
                        {item.description && (
                          <div className="text-muted-foreground line-clamp-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openCollapsibles[item.title] && "rotate-180",
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.href ?? "#"}
                        className="hover:bg-accent flex flex-col items-start gap-1 rounded-lg px-4 py-3 text-left text-sm transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <div className="font-medium">{child.title}</div>
                        {child.description && (
                          <div className="text-muted-foreground line-clamp-1">
                            {child.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={index}
                  to={item.href ?? "#"}
                  className="hover:bg-accent flex flex-col items-start gap-1 rounded-lg px-4 py-3 text-left text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className="text-muted-foreground line-clamp-1">
                      {item.description}
                    </div>
                  )}
                </Link>
              ),
            )}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
