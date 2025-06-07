"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
exports.default = (async (ctx) => {
    const { id } = types_1.getProductRequestSchema.parse(ctx.params);
    const [product] = await (0, repository_1.findProductById)(id);
    if (!product) {
        return ctx.response.body = {
            code: "NotFound",
            product: null
        };
    }
    ctx.response.body = product;
});
