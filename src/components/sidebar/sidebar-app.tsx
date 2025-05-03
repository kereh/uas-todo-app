"use client";

import * as React from "react";
import { SidebarMain } from "@/components/sidebar/sidebar-main";
import { SidebarSecondary } from "@/components/sidebar/sidebar-secondary";
import { SidebarUser } from "@/components/sidebar/sidebar-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menus } from "./sidebar-menus";
import { CommandIcon } from "lucide-react";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <CommandIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">To-Do App</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={menus.navMain} />
        <SidebarSecondary items={menus.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={menus.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
