import { and, eq, SQL } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import db from "../db";
import { products } from "../db/schema";
import { CreateProductRequest, ListProductRequest, UpdateProductRequest } from "./types";

export const selectProducts = async (filters: ListProductRequest) => {
  const conditions: SQL[] = [];

  for (const [key, value] of Object.entries(filters)) {
    const column = products[key as keyof typeof products];
    conditions.push(eq(column as PgColumn, value));
  }

  return db
    .select()
    .from(products)
    .where(and(...conditions));
}


export const findProductById = async (productId: number) => {
  return db
    .select()
    .from(products)
    .where(eq(products.id, productId));
}

export const insertProduct = async (product: CreateProductRequest) => {
  return db
    .insert(products)
    .values(product)
    .returning();
}

export const updateProduct = async ({ fields, productId }: UpdateProductRequest) => {
  return db
    .update(products)
    .set(fields)
    .where(eq(products.id, productId))
    .returning();
}

export const deleteProduct = async (productId: number) => {
  return db
    .delete(products)
    .where(eq(products.id, productId));
}