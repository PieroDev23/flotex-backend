"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
exports.default = (async ({ params, response }) => {
    const { id } = types_1.deleteProductRequestSchema.parse(params);
    await (0, repository_1.deleteProduct)(id);
    response.body = {
        code: "Ok",
        message: "Producto borrado."
    };
});
