import { useState } from "react";
import type { Task } from "@/types";
import * as Sortable from "@/components/ui/sortable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Clock, Check, Trash, X } from "lucide-react";

export function TasksCard({ id, task, isComplete }: Task) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task);

  return (
    <Sortable.Item key={id} value={id} asChild asHandle>
      <Card
        className={cn(
          "w-full max-w-md transform border-l-4 p-0 transition-all duration-300",
          isComplete
            ? "border-l-green-500 bg-green-50/50"
            : "border-l-primary-500 bg-white",
        )}
      >
        <CardContent className={cn("pt-6 pb-2", isComplete && "opacity-80")}>
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border-primary-300 focus-visible:ring-primary-500 mb-2 border-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") "";
                if (e.key === "Escape") "";
              }}
            />
          ) : (
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
                  isComplete
                    ? "bg-green-100 text-green-600"
                    : "bg-primary-100 text-primary-600",
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              <div className="flex-grow">
                <div
                  className={cn(
                    "text-lg font-medium transition-all",
                    isComplete
                      ? "text-muted-foreground line-through"
                      : "text-gray-800",
                  )}
                >
                  {task}
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {isComplete ? "Completed" : "In progress"}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter
          className={cn(
            "flex justify-between gap-2 px-6 py-3 transition-colors duration-300",
            isComplete ? "bg-green-50" : "bg-primary-50",
          )}
        >
          {isEditing ? (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={(): void => {}}
                className="bg-primary-600 hover:bg-primary-700"
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => {}}
                className="border-primary-200 hover:bg-primary-100"
              >
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={isComplete ? "outline" : "default"}
                size="sm"
                onClick={(): void => {}}
                className={cn(
                  "flex-1 transition-all duration-300",
                  isComplete
                    ? "border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                    : "",
                )}
              >
                <Check className="mr-1 h-4 w-4" />
                {isComplete ? "Completed" : "Complete"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => {}}
                className={cn(
                  "flex-1 transition-all duration-300",
                  isComplete
                    ? "border-green-200 text-green-700 hover:bg-green-100"
                    : "border-primary-200 text-primary-700 hover:bg-primary-100",
                )}
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => {}}
                className="flex-1 border-red-200 text-red-600 transition-all duration-300 hover:bg-red-50 hover:text-red-700"
              >
                <Trash className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </Sortable.Item>
  );
}
