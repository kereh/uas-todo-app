"use client";

import type { Task } from "@/types";
import * as Sortable from "@/components/ui/sortable";
import { TasksAdd } from "@/components/tasks/tasks-add";
import { TasksCard } from "@/components/tasks/tasks-card";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data, isLoading } = api.tasks.getAllTask.useQuery();

  return (
    <div className="flex flex-col gap-5">
      <div className="w-auto">
        <TasksAdd />
      </div>
      <Sortable.Root
        value={data ?? []}
        getItemValue={(item) => item.id}
        orientation="mixed"
      >
        <Sortable.Content className="grid auto-rows-fr grid-cols-3 gap-2.5 rounded-md">
          {isLoading
            ? "loading..."
            : data.map((task) => (
                <TasksCard
                  key={task.id}
                  id={task.id}
                  task={task.task}
                  isComplete={task.isComplete}
                />
              ))}
        </Sortable.Content>
        <Sortable.Overlay>
          <div className="bg-primary/10 size-full rounded-md" />
        </Sortable.Overlay>
      </Sortable.Root>
    </div>
  );
}
