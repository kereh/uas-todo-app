"use client";

import { TasksAdd } from "@/components/tasks/tasks-add";
import { TasksCard } from "@/components/tasks/tasks-card";
import * as Sortable from "@/components/ui/sortable";
import type { Task } from "@/types";
import * as React from "react";

export default function Page() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: "1",
      task: "The 900",
      isComplete: false,
    },
    {
      id: "2",
      task: "Indy Backflip",
      isComplete: false,
    },
    {
      id: "3",
      task: "Pizza Guy",
      isComplete: false,
    },
    {
      id: "4",
      task: "Rocket Air",
      isComplete: false,
    },
    {
      id: "5",
      task: "Kickflip Backflip",
      isComplete: false,
    },
    {
      id: "6",
      task: "FS 540",
      isComplete: false,
    },
  ]);

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
        <Sortable.Content className="grid auto-rows-fr grid-cols-3 gap-2.5 rounded-md">
          {tasks.map((task) => (
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
