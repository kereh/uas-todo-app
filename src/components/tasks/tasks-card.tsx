import { useState, memo } from "react";
import type { Task } from "@/types";
import * as Sortable from "@/components/ui/sortable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Clock, Check, Trash, X } from "lucide-react";

const TasksCardComponent = ({ id, task, isComplete }: Task) => {
  return (
    <Sortable.Item key={id} value={id} asChild asHandle>
      <h1 className="text-2xl">{task}</h1>
    </Sortable.Item>
  );
};

export const TasksCard = memo(TasksCardComponent);
