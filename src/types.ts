import { type LucideIcon } from "lucide-react";

export interface SidebarMainProps {
  items: Array<{
    title: string;
    url: string;
    icon?: LucideIcon;
  }>;
}

export interface Tasks {
  tasks: Array<{
    id: string;
    task: string;
    isComplete: boolean;
  }>;
}
