"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    userId: zod_1.z.number(),
    country: zod_1.z.string(),
    city: zod_1.z.string(),
    address: zod_1.z.string().min(10),
    reference: zod_1.z.string().optional(),
});
