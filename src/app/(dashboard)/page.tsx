"use client";

import type { Task } from "@/types";
import * as Sortable from "@/components/ui/sortable";
import { TasksAdd } from "@/components/tasks/tasks-add";
import { TasksCard } from "@/components/tasks/tasks-card";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isLoading } = api.tasks.getAllTask.useQuery();

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-auto">
        <TasksAdd />
      </div>
      <Sortable.Root
        value={tasks}
        onValueChange={setTasks}
        getItemValue={(item) => item.id}
        orientation="mixed"
      >
        {isLoading ? (
          "loading..."
        ) : (
          <Sortable.Content className="grid auto-rows-fr grid-cols-3 gap-3 rounded-md">
            {tasks?.map((task) => (
              <TasksCard
                key={task.id}
                id={task.id}
                task={task.task}
                isComplete={task.isComplete}
              />
            ))}
          </Sortable.Content>
        )}
        <Sortable.Overlay>
          <div className="bg-primary/10 size-full rounded-md" />
        </Sortable.Overlay>
      </Sortable.Root>
    </div>
  );
}
