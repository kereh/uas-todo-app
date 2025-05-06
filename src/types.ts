import { type LucideIcon } from "lucide-react";

export interface SidebarMainProps {
  items: Array<{
    title: string;
    url: string;
    isActive?: boolean;
    icon?: LucideIcon;
  }>;
}

export interface Task {
  id: string;
  task: string | null;
  isComplete: boolean | null;
}

export interface Tasks {
  tasks: Array<Task>;
}
