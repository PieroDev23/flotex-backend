"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
const repository_1 = require("../repository");
exports.default = (async ({ request, response }) => {
    const address = type_1.addressSchema.parse(request.body);
    const addressCreated = await (0, repository_1.insertAddress)(address);
    response.status = 200;
    response.body = addressCreated;
});
