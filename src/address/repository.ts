import { eq } from "drizzle-orm"
import { Address } from "./type";
import db from "../db";
import { addresses } from "../db/schema";



export const findAddressesByUserId = async (userId: number) => {
  return await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId));
}

export const findOneAddressById = async (addressId: string) => {
  return await db
    .select()
    .from(addresses)
    .where(eq(addresses.id, addressId))
}

export const insertAddress = async (address: Address) => {
  return await db
    .insert(addresses)
    .values(address)
}