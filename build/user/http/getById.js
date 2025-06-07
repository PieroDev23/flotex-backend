"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
exports.default = (async ({ params, response }) => {
    const { userId } = types_1.getUserRequestSchema.parse(params);
    const [user] = await (0, repository_1.findOneUserById)(userId);
    if (!user) {
        response.status = 404;
        response.body = {
            code: "UserNotFound",
            message: "User not found"
        };
        return;
    }
    const { password, ...publicUserData } = user;
    response.status = 200;
    response.body = publicUserData;
});
