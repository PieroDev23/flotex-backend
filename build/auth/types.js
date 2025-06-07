"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserRequestSchema = exports.createUserRequestSchema = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const schema_1 = require("../db/schema");
exports.createUserRequestSchema = (0, drizzle_zod_1.createInsertSchema)(schema_1.users).omit({ id: true });
exports.loginUserRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4)
});
