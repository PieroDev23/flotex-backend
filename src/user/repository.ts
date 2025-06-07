import { and, eq, like, or, SQL } from "drizzle-orm"
import db from "../db"
import { users } from "../db/schema"
import { ListUserRequest, UpdateUserFields } from "./types"

export const findOneUserById = (userId: number) => {
  return db
    .select()
    .from(users)
    .where(eq(users.id, userId));
}

export const findAllUsers = (filters?: ListUserRequest) => {
  if (!filters || Object.keys(filters).length === 0) {
    return db.select().from(users);
  }

  const conditions: SQL[] = [];

  // Compound search for name/email fields
  if (filters.search) {
    conditions.push(
      or(
        like(users.firstname, `%${filters.search}%`),
        like(users.lastname, `%${filters.search}%`),
        like(users.email, `%${filters.search}%`)
      )!
    );
  }

  // Exact matches for role and status
  if (filters.role) {
    conditions.push(eq(users.role, filters.role as any));
  }

  if (filters.active) {
    conditions.push(eq(users.active, filters.active as any));
  }

  return db
    .select()
    .from(users)
    .where(and(...conditions));
}

export const updateUser = (userId: number, fields: UpdateUserFields) => {
  return db
    .update(users)
    .set(fields)
    .where(eq(users.id, userId))
    .returning();
}

export const deleteUser = (userId: number) => {
  return db
    .delete(users)
    .where(eq(users.id, userId))
    .returning();
}
