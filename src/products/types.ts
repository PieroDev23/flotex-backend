import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "../db/schema";



export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().url(),
  description: z.string(),
  price: z.number().int(),
  sku: z.string(),
  stock: z.number().int(),
  status: z.enum(["ACTIVE", "NOT_ACTIVE"]).default("ACTIVE"),
  categoryId: z.string(),
  discount: z.number().int().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Product = z.infer<typeof productSchema>;

export const listProductsRequestSchema = z.object({
  name: z.string(),
  id: z.number(),
  categoryId: z.string(),
  createdAt: z.string().date(),
  sku: z.string(),
  priceSort: z.enum(["asc", "desc"])
}).partial();
export type ListProductRequest = z.infer<typeof listProductsRequestSchema>;

export const createProductRequestSchema = createInsertSchema(products);
export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;

export const updateProductRequestSchema = z.object({
  productId: z.number(),
  fields: createUpdateSchema(products).omit({ id: true })
});
export type UpdateProductRequest = z.infer<typeof updateProductRequestSchema>;


export const deleteProductRequestSchema = z.object({ id: z.coerce.number() });
export type DeleteProductRequest = z.infer<typeof deleteProductRequestSchema>;


export const getProductRequestSchema = z.object({ id: z.coerce.number() });
export type GetProductRequest = z.infer<typeof getProductRequestSchema>;