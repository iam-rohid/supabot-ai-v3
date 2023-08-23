"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type SidebarNavProps = {
  list: {
    title?: string;
    items: {
      href: string;
      label: string;
      icon: ReactNode;
      end?: boolean;
    }[];
  }[];
};

export default function SidebarNav({ list }: SidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav className="p-4 space-y-6 flex-1 overflow-y-auto">
      {list.map((group, i) => (
        <div key={i}>
          {group.title && (
            <div className="pl-4 text-xs text-muted-foreground pb-2">
              {group.title}
            </div>
          )}
          <div className="grid gap-px">
            {group.items.map((item, j) => (
              <Button
                key={j}
                asChild
                variant="ghost"
                className={cn({
                  "bg-accent text-accent-foreground": item.end
                    ? pathname === item.href
                    : pathname.startsWith(item.href),
                })}
              >
                <Link href={item.href}>
                  {item.icon}
                  <p className="flex-1 truncate ml-2">{item.label}</p>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
