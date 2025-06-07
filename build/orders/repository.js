"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.insertOrderItems = exports.insertOrder = exports.selectOrder = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const selectOrder = (orderId) => {
    return db_1.default
        .select()
        .from(schema_1.orders)
        .innerJoin(schema_1.orderItems, (0, drizzle_orm_1.eq)(schema_1.orderItems.orderId, orderId))
        .innerJoin(schema_1.products, (0, drizzle_orm_1.eq)(schema_1.products.id, schema_1.orderItems.productId))
        .where((0, drizzle_orm_1.eq)(schema_1.orders.id, orderId));
};
exports.selectOrder = selectOrder;
const insertOrder = async (order) => {
    const { totalAmount, address, addressId, city, country, detail, email, userId, firstname, lastname, phone, reference, shippingType, } = order;
    return db_1.default.transaction(async (tx) => {
        try {
            const baseValues = {
                totalAmount,
                addressId,
                userId,
                shippingType,
                detail,
            };
            const guestValues = addressId
                ? {}
                : {
                    guestCity: city,
                    guestCountry: country,
                    guestAddress: address,
                    guestEmail: email,
                    guestFirstname: firstname,
                    guestLastname: lastname,
                    guestPhone: phone,
                    guestReference: reference,
                };
            return await tx
                .insert(schema_1.orders)
                .values({
                ...baseValues,
                ...guestValues,
            })
                .returning({ orderId: schema_1.orders.id });
        }
        catch {
            tx.rollback();
            return null;
        }
    });
};
exports.insertOrder = insertOrder;
const insertOrderItems = async (products, orderId) => {
    return db_1.default.transaction(async (tx) => {
        try {
            return await tx
                .insert(schema_1.orderItems)
                .values(products.map(p => ({ productId: p.id, quantity: p.quantity, orderId })))
                .returning({ insertedId: schema_1.orderItems.orderId });
        }
        catch {
            tx.rollback();
            return null;
        }
    });
};
exports.insertOrderItems = insertOrderItems;
const updateOrder = async (status) => {
    return db_1.default
        .update(schema_1.orders)
        .set({ status });
};
exports.updateOrder = updateOrder;
