import { and, asc, desc, eq, like, or, SQL } from "drizzle-orm";
import db from "../db";
import { products } from "../db/schema";
import { CreateProductRequest, ListProductRequest, UpdateProductRequest } from "./types";

export const selectProducts = async (filters: ListProductRequest) => {
  if (!filters || Object.keys(filters).length === 0) {
    return db.select().from(products);
  }

  const conditions: SQL[] = [];

  // Compound search for name/sku fields
  if (filters.search) {
    conditions.push(
      or(
        like(products.name, `%${filters.search}%`),
        like(products.sku, `%${filters.search}%`)
      )!
    );
  }

  // Individual field filters for backward compatibility
  if (filters.name) {
    conditions.push(like(products.name, `%${filters.name}%`));
  }
  if (filters.id) {
    conditions.push(eq(products.id, filters.id));
  }
  if (filters.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }
  if (filters.sku) {
    conditions.push(eq(products.sku, filters.sku));
  }

  const baseQuery = db.select().from(products);
  const whereClause = and(...conditions);

  const query = filters.priceSort
    ? baseQuery
        .where(whereClause)
        .orderBy(filters.priceSort === 'asc' ? asc(products.price) : desc(products.price))
    : baseQuery.where(whereClause);

  return query;
};
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
