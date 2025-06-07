import { and, eq, or } from "drizzle-orm";
import db from "../db";
import { users } from "../db/schema";
import { CreateUserRequest } from "./types";

export const findUserByEmail = async (email: string) => {
  return db
    .select()
    .from(users)
    .where(
      eq(users.email, email),
    )
}

export const createUserAccount = async (user: CreateUserRequest) => {
  return db
    .insert(users)
    .values(user)
    .returning();
}