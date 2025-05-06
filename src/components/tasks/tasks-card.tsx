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
import { Trash2, Activity, Pencil, Check, CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function TasksCard({ id, task, isComplete }: Task) {
  const utils = api.useUtils();
  const deleteTask = api.tasks.deleteTask.useMutation({
    onSuccess: async () => {
      await utils.tasks.invalidate();
      toast("Success", {
        icon: <Check className="mr-2 h-4 w-4" />,
        description: `The task has been deleted at ${new Date()}`,
      });
    },
  });
  const completeTask = api.tasks.completeTask.useMutation({
    onSuccess: async () => {
      await utils.tasks.invalidate();
      toast("Success", {
        icon: <Check className="mr-2 h-4 w-4" />,
        description: `The task has been completed at ${new Date()}`,
      });
    },
  });
  const undoTask = api.tasks.undoTask.useMutation({
    onSuccess: async () => {
      await utils.tasks.invalidate();
      toast("Success", {
        icon: <Check className="mr-2 h-4 w-4" />,
        description: `The task has been updated at ${new Date()}`,
      });
    },
  });

  return (
    <Card className="w-full p-0 transition-all hover:shadow-md">
      <Editable.Root defaultValue={task!} placeholder="Enter your text here">
        <CardContent className="pt-6">
          <div className="mb-3 flex items-center gap-4">
            {isComplete ? (
              <CircleCheck className="h-6 w-6 text-green-500" />
            ) : (
              <Activity className="h-4 w-4 text-blue-500" />
            )}
            <div className="flex-1">
              <Editable.Area>
                <Editable.Preview
                  className={cn(
                    "cursor-pointer text-xl font-medium",
                    isComplete && "text-muted-foreground line-through",
                  )}
                />
                <Editable.Input />
              </Editable.Area>
              <Editable.Toolbar>
                <Editable.Submit asChild>
                  <Button size="sm">Save</Button>
                </Editable.Submit>
                <Editable.Cancel asChild>
                  <Button variant="outline" size="sm">
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
                onClick={() => undoTask.mutate({ id: id })}
                className="text-muted-foreground"
                disabled={
                  deleteTask.isPending ||
                  completeTask.isPending ||
                  undoTask.isPending
                }
              >
                <Check className="h-5 w-5" />
                <span className="sr-only">Undo</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => completeTask.mutate({ id: id })}
                className="text-muted-foreground"
                disabled={
                  deleteTask.isPending ||
                  completeTask.isPending ||
                  undoTask.isPending
                }
              >
                <Check className="h-5 w-5" />
                <span className="sr-only">Mark As Complete</span>
              </Button>
            )}
            <Editable.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => {}}
                className="text-muted-foreground"
                disabled={
                  deleteTask.isPending ||
                  completeTask.isPending ||
                  undoTask.isPending
                }
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
                  onClick={(): void => {}}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  disabled={deleteTask.isPending || completeTask.isPending}
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
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleteTask.isPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteTask.mutate({ id: id })}
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
