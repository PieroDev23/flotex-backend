"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.findAllUsers = exports.findOneUserById = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const findOneUserById = (userId) => {
    return db_1.default
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
};
exports.findOneUserById = findOneUserById;
const findAllUsers = (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
        return db_1.default.select().from(schema_1.users);
    }
    const conditions = [];
    // Compound search for name/email fields
    if (filters.search) {
        conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(schema_1.users.firstname, `%${filters.search}%`), (0, drizzle_orm_1.like)(schema_1.users.lastname, `%${filters.search}%`), (0, drizzle_orm_1.like)(schema_1.users.email, `%${filters.search}%`)));
    }
    // Exact matches for role and status
    if (filters.role) {
        conditions.push((0, drizzle_orm_1.eq)(schema_1.users.role, filters.role));
    }
    if (filters.active) {
        conditions.push((0, drizzle_orm_1.eq)(schema_1.users.active, filters.active));
    }
    return db_1.default
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.and)(...conditions));
};
exports.findAllUsers = findAllUsers;
const updateUser = (userId, fields) => {
    return db_1.default
        .update(schema_1.users)
        .set(fields)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
        .returning();
};
exports.updateUser = updateUser;
const deleteUser = (userId) => {
    return db_1.default
        .delete(schema_1.users)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
        .returning();
};
exports.deleteUser = deleteUser;
