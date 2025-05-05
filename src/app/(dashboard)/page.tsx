"use client";

import type { Task } from "@/types";
import { TasksAdd } from "@/components/tasks/tasks-add";
import { TasksCard } from "@/components/tasks/tasks-card";
import {
  Listbox,
  ListboxItem,
  ListboxItemIndicator,
} from "@/components/ui/listbox";
import { api } from "@/trpc/react";

export default function Page() {
  const { data, isLoading } = api.tasks.getAllTask.useQuery();

  return (
    <div className="flex flex-col gap-5">
      <div className="w-auto">
        <TasksAdd />
      </div>
      <Listbox orientation="mixed" className="grid w-full gap-2 sm:grid-cols-3">
        {data?.map((task) => (
          <ListboxItem key={task.id} value={task.task!} className="items-start">
            <div className="flex flex-col gap-px">
              <div className="font-medium">{task.task}</div>
              <div className="text-muted-foreground line-clamp-2 text-sm">
                {task.isComplete ? "Completed" : "Complete"}
              </div>
            </div>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
