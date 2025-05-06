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
              <p
                className={cn(
                  "text-muted-foreground mt-1 text-xs",
                  isComplete ? "text-green-500" : "text-blue-500",
                )}
              >
                {isComplete ? "Completed" : "Progress"}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-end gap-4 border-t py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={(): void => {}}
              className="text-muted-foreground"
              disabled={deleteTask.isPending}
            >
              <Check className="h-5 w-5" />
              <span className="sr-only">Mark As Complete</span>
            </Button>
            <Editable.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => {}}
                className="text-muted-foreground"
                disabled={deleteTask.isPending}
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
                  disabled={deleteTask.isPending}
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
