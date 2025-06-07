"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
exports.default = (async ({ request, response }) => {
    const { products, ...order } = types_1.createOrderRequestSchema.parse(request.body);
    const newOrder = await (0, repository_1.insertOrder)(order);
    if (!newOrder) {
        response.status = 500;
        return response.body = {
            code: "OrderCreationFailed",
            message: "Cannot create the order",
        };
    }
    const [{ orderId }] = newOrder;
    const res = await (0, repository_1.insertOrderItems)(products, orderId);
    if (!res) {
        response.status = 500;
        return response.body = {
            code: "OrderCreationFailed",
            message: "Cannot create the order",
        };
    }
    response.body = {
        code: "OrderCreated",
        message: "Order successfully created",
        orderId,
    };
});
