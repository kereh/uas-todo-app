import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { tasks } from "@/server/db/schema";

export const tasksRouter = createTRPCRouter({
  getAllTask: protectedProcedure.query(async ({ ctx }) => {
    return "hi";
  }),
  addNewTask: protectedProcedure
    .input(
      z.object({
        task: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        task: input.task,
        createdBy: ctx.session.user.id,
      });
    }),
});
