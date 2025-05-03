"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { CommandIcon } from "lucide-react";
import { SidebarMain } from "@/components/sidebar/sidebar-main";
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
import { menus } from "@/components/sidebar/sidebar";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, status } = useSession();

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
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={data?.user} status={status} />
      </SidebarFooter>
    </Sidebar>
  );
}
