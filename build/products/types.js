"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductRequestSchema = exports.deleteProductRequestSchema = exports.updateProductRequestSchema = exports.createProductFormSchema = exports.createProductRequestSchema = exports.listProductsRequestSchema = exports.productSchema = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const schema_1 = require("../db/schema");
exports.productSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    imageUrl: zod_1.z.string().url(),
    description: zod_1.z.string(),
    price: zod_1.z.number().int(),
    sku: zod_1.z.string(),
    stock: zod_1.z.number().int(),
    status: zod_1.z.enum(["ACTIVE", "NOT_ACTIVE"]).default("ACTIVE"),
    categoryId: zod_1.z.string(),
    discount: zod_1.z.number().int().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.listProductsRequestSchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    name: zod_1.z.string(),
    id: zod_1.z.number(),
    categoryId: zod_1.z.string(),
    createdAt: zod_1.z.string().date(),
    sku: zod_1.z.string(),
    priceSort: zod_1.z.enum(["asc", "desc"])
}).partial();
exports.createProductRequestSchema = (0, drizzle_zod_1.createInsertSchema)(schema_1.products);
// Schema for multipart form data (without image URL, as it will be generated)
exports.createProductFormSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().min(1, "Product description is required"),
    price: zod_1.z.coerce.number().int().positive("Price must be a positive integer"),
    sku: zod_1.z.string().min(1, "SKU is required"),
    stock: zod_1.z.coerce.number().int().min(0, "Stock must be non-negative"),
    categoryId: zod_1.z.string().min(1, "Category ID is required"),
    discount: zod_1.z.coerce.number().int().min(0).max(100).nullable().optional(),
});
exports.updateProductRequestSchema = zod_1.z.object({
    productId: zod_1.z.number(),
    fields: (0, drizzle_zod_1.createUpdateSchema)(schema_1.products).omit({ id: true })
});
exports.deleteProductRequestSchema = zod_1.z.object({ id: zod_1.z.coerce.number() });
exports.getProductRequestSchema = zod_1.z.object({ id: zod_1.z.coerce.number() });
