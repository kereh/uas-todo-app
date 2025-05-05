import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function TaskForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="task">Task</Label>
        <Input type="text" id="task" placeholder="Something i wanna a do" />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
