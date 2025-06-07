import { z } from "zod";
import { createUpdateSchema } from "drizzle-zod";
import { users } from "../db/schema";

export const userSchema = z.object({
  id: z.number().int().positive(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  password: z.string().min(1),
  phone: z.number().int(),
  email: z.string().email(),
  active: z.enum(["ACITVE", "INACTIVE"]),
  role: z.enum(["ADMIN", "COSTUMER"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const getUserRequestSchema = z.object({
  userId: z.coerce.number()
});

export const updateUserRequestSchema = z.object({
  userId: z.coerce.string(),
  fields: createUpdateSchema(users).omit({ id: true })
    .extend({
      password: z.string().min(6).optional()
    })
});

export const deleteUserRequestSchema = z.object({
  userId: z.coerce.number()
});

export const listUsersRequestSchema = z.object({
  search: z.string().optional(),
  role: z.enum(["ADMIN", "CUSTOMER"]).optional(),
  active: z.enum(["ACITVE", "NOT_ACTIVE"]).optional(),
}).partial();

export type User = z.infer<typeof userSchema>;
export type UpdateUserFields = z.infer<typeof updateUserRequestSchema>["fields"];
export type ListUserRequest = z.infer<typeof listUsersRequestSchema>;
