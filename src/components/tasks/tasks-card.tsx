"use client";

import type { Task } from "@/types";
import * as Editable from "@/components/ui/editable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Trash2,
  Activity,
  Pencil,
  Check,
  CircleCheck,
  Undo,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React, { useState } from "react";

export function TasksCard({ id, task, isComplete }: Task) {
  const [newTaskValue, setNewTaskValue] = useState<string>(task || "");
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const utils = api.useUtils();

  const handleSuccess = async () => {
    await utils.tasks.invalidate();
    toast("Success", {
      icon: <Check className="mr-2 h-4 w-4" />,
      description: `The task has been updated at ${new Date()}`,
    });
  };

  const deleteTask = api.tasks.deleteTask.useMutation({
    onSuccess: handleSuccess,
  });

  const completeTask = api.tasks.completeTask.useMutation({
    onSuccess: handleSuccess,
  });

  const undoTask = api.tasks.undoTask.useMutation({
    onSuccess: handleSuccess,
  });

  const updateTask = api.tasks.updateTask.useMutation({
    onSuccess: handleSuccess,
  });

  const isLoading =
    deleteTask.isPending ||
    completeTask.isPending ||
    undoTask.isPending ||
    updateTask.isPending;

  const handleTaskUpdate = async (taskToSave: string) => {
    setIsEdit(false);

    if (taskToSave.length > 30) {
      toast("Failed", {
        icon: <Check className="mr-2 h-4 w-4" />,
        description: "Task cannot be more than 30 characters",
      });
      return;
    }

    if (taskToSave && taskToSave !== task) {
      updateTask.mutate({
        id,
        task: taskToSave,
      });
    }
  };

  if (!task) {
    return (
      <div className="border-muted flex items-center justify-between rounded-lg border p-4">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  return (
    <Card className="relative w-full p-0 transition-all hover:shadow-md">
      <Editable.Root
        defaultValue={task}
        onSubmit={() => handleTaskUpdate(newTaskValue)}
        onEdit={() => setIsEdit(true)}
        onCancel={() => setIsEdit(false)}
        placeholder="Enter your task here"
        disabled={isInputInvalid}
      >
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div>
              <Editable.Area className="flex items-center gap-4">
                {isComplete ? (
                  <CircleCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <Activity className="h-5 w-5 text-blue-500" />
                )}
                <Editable.Preview
                  className={cn(
                    "text-muted-foreground cursor-pointer font-medium",
                    isComplete && "text-muted-foreground line-through",
                  )}
                />
                <Editable.Input
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setNewTaskValue(value);
                    setIsInputInvalid(value.length > 30);
                  }}
                />
              </Editable.Area>
              <Editable.Toolbar>
                <Editable.Submit asChild>
                  <Button size="sm" disabled={isInputInvalid}>
                    Save
                  </Button>
                </Editable.Submit>
                <Editable.Cancel asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsInputInvalid(false)}
                  >
                    Cancel
                  </Button>
                </Editable.Cancel>
              </Editable.Toolbar>
            </div>
          </div>
          <div className="flex w-full items-center justify-start gap-4 py-4">
            <p
              className={cn(
                "text-muted-foreground justify-start rounded-md border bg-current/10 px-3 py-1 text-xs",
                isComplete ? "text-green-500" : "text-blue-500",
              )}
            >
              {isComplete ? "Completed" : "Progress"}
            </p>
            {isComplete ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => undoTask.mutate({ id })}
                className="text-muted-foreground"
                disabled={isLoading || isInputInvalid || isEdit}
              >
                <Undo className="h-5 w-5" />
                <span className="sr-only">Undo</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => completeTask.mutate({ id })}
                className="text-muted-foreground"
                disabled={isLoading || isInputInvalid || isEdit}
              >
                <Check className="h-5 w-5" />
                <span className="sr-only">Mark As Complete</span>
              </Button>
            )}
            <Editable.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground"
                disabled={isLoading || isInputInvalid || isEdit}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </Editable.Trigger>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  disabled={isLoading || isInputInvalid || isEdit}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete todo</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleteTask.isPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteTask.mutate({ id })}
                    disabled={deleteTask.isPending}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Editable.Root>
    </Card>
  );
}
