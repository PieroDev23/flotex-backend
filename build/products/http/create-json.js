"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
// Legacy endpoint for creating products with JSON (backward compatibility)
exports.default = (async ({ request, response }) => {
    try {
        const product = types_1.createProductRequestSchema.parse(request.body);
        const productCreated = await (0, repository_1.insertProduct)(product);
        response.status = 201;
        response.body = {
            code: "ProductCreated",
            message: "Product created successfully",
            product: productCreated[0]
        };
    }
    catch (error) {
        console.error('Error creating product:', error);
        response.status = 500;
        response.body = {
            code: "ProductCreationFailed",
            message: "Failed to create product",
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
});
