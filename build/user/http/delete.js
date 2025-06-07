"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
exports.default = (async ({ params, response }) => {
    const { userId } = types_1.deleteUserRequestSchema.parse(params);
    const result = await (0, repository_1.deleteUser)(userId);
    if (!result || result.length === 0) {
        response.status = 404;
        response.body = {
            code: "UserNotFound",
            message: "User not found"
        };
        return;
    }
    response.status = 200;
    response.body = {
        code: "UserDeleted",
        message: "User successfully deleted"
    };
});
