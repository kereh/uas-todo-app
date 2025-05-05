import { memo } from "react";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";
import * as Sortable from "@/components/ui/sortable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, SlidersHorizontal } from "lucide-react";

const TasksCardComponent = ({ id, task, isComplete }: Task) => {
  return (
    <Sortable.Item key={id} value={id} asChild asHandle>
      <Card className={cn("p-0 transition-all duration-300 hover:shadow-lg")}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p
                className={cn(
                  "truncate text-sm font-medium",
                  isComplete && "text-muted-foreground line-through",
                )}
              >
                {task}
              </p>
            </div>
            {isComplete && (
              <span className="mt-1 inline-flex items-center rounded-full px-2 text-sm font-medium text-green-600">
                <Check />
                Completed
              </span>
            )}
            <SlidersHorizontal className="h-4 w-4 cursor-pointer" />
          </div>
        </CardContent>
      </Card>
    </Sortable.Item>
  );
};

export const TasksCard = memo(TasksCardComponent);
