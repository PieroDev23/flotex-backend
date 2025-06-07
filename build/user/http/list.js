"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const types_1 = require("../types");
exports.default = (async ({ request, response }) => {
    const filters = request.query ? types_1.listUsersRequestSchema.parse(request.query) : undefined;
    const users = await (0, repository_1.findAllUsers)(filters);
    // Remove sensitive information
    const publicUsers = users.map(({ password, ...userData }) => userData);
    response.status = 200;
    response.body = publicUsers;
});
