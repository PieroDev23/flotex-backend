"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
const service_1 = require("../../auth/service");
exports.default = (async ({ request, response }) => {
    const { userId, fields } = types_1.updateUserRequestSchema.parse(request.body);
    // Hash password if it's being updated
    if (fields.password) {
        fields.password = (0, service_1.hashPassword)(fields.password);
    }
    const [updatedUser] = await (0, repository_1.updateUser)(Number(userId), fields);
    if (!updatedUser) {
        response.status = 404;
        response.body = {
            code: "UserNotFound",
            message: "User not found"
        };
        return;
    }
    const { password, ...publicUserData } = updatedUser;
    response.status = 200;
    response.body = publicUserData;
});
