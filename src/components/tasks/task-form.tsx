"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Check } from "lucide-react";

export function TaskForm({ className }: React.ComponentProps<"form">) {
  const utils = api.useUtils();
  const [task, setTask] = React.useState<string>("");
  const newTask = api.tasks.addNewTask.useMutation({
    onSuccess: async () => {
      await utils.tasks.invalidate();
      setTask("");
      toast("Success", {
        icon: <Check />,
        description: `The new task has been added at ${new Date()}`,
      });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newTask.mutate({ task: task });
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="task">Task</Label>
        <Input
          type="text"
          id="task"
          placeholder="Something i wanna a do"
          value={task}
          onChange={(e) => setTask(e.currentTarget.value)}
          required
        />
      </div>
      <Button type="submit" disabled={newTask.isPending}>
        {newTask.isPending ? "Loading..." : "Add"}
      </Button>
    </form>
  );
}
