import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { tasks } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const tasksRouter = createTRPCRouter({
  getAllTask: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.tasks.findMany({
      columns: {
        id: true,
        task: true,
        isComplete: true,
      },
      where: eq(tasks.createdBy, ctx.session.user.id),
    });
  }),
  addNewTask: protectedProcedure
    .input(
      z.object({
        task: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(tasks).values({
        task: input.task,
        createdBy: ctx.session.user.id,
      });
    }),
  updateTask: protectedProcedure
    .input(
      z.object({
        task: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(tasks)
        .set({
          task: input.task,
        })
        .where(eq(tasks.id, input.id));
    }),
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(tasks).where(eq(tasks.id, input.id));
    }),
  completeTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(tasks)
        .set({
          isComplete: true,
        })
        .where(eq(tasks.id, input.id));
    }),
  undoTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(tasks)
        .set({
          isComplete: false,
        })
        .where(eq(tasks.id, input.id));
    }),
});
