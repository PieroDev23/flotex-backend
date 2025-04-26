import { and, eq } from "drizzle-orm"
import db from "../db"
import { users } from "../db/schema"
import { CreateUserRequest } from "./types";

// TODO: considerar extender estas funciones para que puedan soportar validaciones para administradores
// aunque probablemente no sea necesario ya que los admins se crearan por BD
export const findUserByEmail = async (email: string) => {
  return db
    .select()
    .from(users)
    .where(
      and(
        eq(users.email, email),
        eq(users.role, "CUSTOMER")));
}

export const createUserAccount = async (user: CreateUserRequest) => {
  return db
    .insert(users)
    .values(user)
    .returning();
}