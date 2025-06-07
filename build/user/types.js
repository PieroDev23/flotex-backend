"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersRequestSchema = exports.deleteUserRequestSchema = exports.updateUserRequestSchema = exports.getUserRequestSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const drizzle_zod_1 = require("drizzle-zod");
const schema_1 = require("../db/schema");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    firstname: zod_1.z.string().min(1),
    lastname: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    phone: zod_1.z.number().int(),
    email: zod_1.z.string().email(),
    active: zod_1.z.enum(["ACITVE", "INACTIVE"]),
    role: zod_1.z.enum(["ADMIN", "COSTUMER"]),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.getUserRequestSchema = zod_1.z.object({
    userId: zod_1.z.coerce.number()
});
exports.updateUserRequestSchema = zod_1.z.object({
    userId: zod_1.z.coerce.string(),
    fields: (0, drizzle_zod_1.createUpdateSchema)(schema_1.users).omit({ id: true })
        .extend({
        password: zod_1.z.string().min(6).optional()
    })
});
exports.deleteUserRequestSchema = zod_1.z.object({
    userId: zod_1.z.coerce.number()
});
exports.listUsersRequestSchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    role: zod_1.z.enum(["ADMIN", "CUSTOMER"]).optional(),
    active: zod_1.z.enum(["ACITVE", "NOT_ACTIVE"]).optional(),
}).partial();
