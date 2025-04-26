import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../db/schema";


export const createUserRequestSchema = createInsertSchema(users).omit({ id: true });

export const loginUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});


export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;