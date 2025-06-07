"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.insertProduct = exports.findProductById = exports.selectProducts = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const selectProducts = async (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
        return db_1.default.select().from(schema_1.products);
    }
    const conditions = [];
    // Compound search for name/sku fields
    if (filters.search) {
        conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(schema_1.products.name, `%${filters.search}%`), (0, drizzle_orm_1.like)(schema_1.products.sku, `%${filters.search}%`)));
    }
    // Individual field filters for backward compatibility
    if (filters.name) {
        conditions.push((0, drizzle_orm_1.like)(schema_1.products.name, `%${filters.name}%`));
    }
    if (filters.id) {
        conditions.push((0, drizzle_orm_1.eq)(schema_1.products.id, filters.id));
    }
    if (filters.categoryId) {
        conditions.push((0, drizzle_orm_1.eq)(schema_1.products.categoryId, filters.categoryId));
    }
    if (filters.sku) {
        conditions.push((0, drizzle_orm_1.eq)(schema_1.products.sku, filters.sku));
    }
    const baseQuery = db_1.default.select().from(schema_1.products);
    const whereClause = (0, drizzle_orm_1.and)(...conditions);
    const query = filters.priceSort
        ? baseQuery
            .where(whereClause)
            .orderBy(filters.priceSort === 'asc' ? (0, drizzle_orm_1.asc)(schema_1.products.price) : (0, drizzle_orm_1.desc)(schema_1.products.price))
        : baseQuery.where(whereClause);
    return query;
};
exports.selectProducts = selectProducts;
const findProductById = async (productId) => {
    return db_1.default
        .select()
        .from(schema_1.products)
        .where((0, drizzle_orm_1.eq)(schema_1.products.id, productId));
};
exports.findProductById = findProductById;
const insertProduct = async (product) => {
    return db_1.default
        .insert(schema_1.products)
        .values(product)
        .returning();
};
exports.insertProduct = insertProduct;
const updateProduct = async ({ fields, productId }) => {
    return db_1.default
        .update(schema_1.products)
        .set(fields)
        .where((0, drizzle_orm_1.eq)(schema_1.products.id, productId))
        .returning();
};
exports.updateProduct = updateProduct;
const deleteProduct = async (productId) => {
    return db_1.default
        .delete(schema_1.products)
        .where((0, drizzle_orm_1.eq)(schema_1.products.id, productId));
};
exports.deleteProduct = deleteProduct;
