"use client";

import { TasksAdd } from "@/components/tasks/tasks-add";
import { TasksCard } from "@/components/tasks/tasks-card";
import { api } from "@/trpc/react";

export default function Page() {
  const { data, isLoading } = api.tasks.getAllTask.useQuery();

  return (
    <div className="flex flex-col gap-5">
      <div className="w-auto">
        <TasksAdd />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        {!isLoading && data?.length === 0 && <p>No tasks found.</p>}
        {isLoading
          ? "Loading Tasks..."
          : data?.map((task) => (
              <TasksCard
                key={task.id}
                id={task.id}
                task={task.task}
                isComplete={task.isComplete}
              />
            ))}
      </div>
    </div>
  );
}
