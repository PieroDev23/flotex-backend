"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const types_1 = require("../types");
exports.default = (async ({ request, response }) => {
    const filters = request.query ? types_1.listProductsRequestSchema.parse(request.query) : {};
    const products = await (0, repository_1.selectProducts)(filters);
    response.status = 200;
    response.body = products;
});
