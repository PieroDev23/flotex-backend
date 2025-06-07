"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderRequestSchema = exports.createOrderRequestSchema = exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.number().optional(),
    addressId: zod_1.z.string().uuid().optional(),
    firstname: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    reference: zod_1.z.string().optional(),
    phone: zod_1.z.coerce.string().optional(),
    email: zod_1.z.string().email().optional(),
    detail: zod_1.z.string().optional(),
    shippingType: zod_1.z.enum(["SHIPPING", "INHOUSE"]),
    status: zod_1.z.enum(["RECEIVED", "IN_PROGRESS", "SHIPPING", "DELIVERED", "CANCELED"]).optional(),
    totalAmount: zod_1.z.coerce.string()
});
exports.createOrderRequestSchema = exports.orderSchema
    .merge(zod_1.z.object({
    products: zod_1.z.object({
        id: zod_1.z.number(),
        imageUrl: zod_1.z.string().optional(),
        price: zod_1.z.number(),
        name: zod_1.z.string(),
        quantity: zod_1.z.number(),
    }).array()
})).omit({ id: true });
exports.getOrderRequestSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid()
});
