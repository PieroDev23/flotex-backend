"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const service_1 = require("../service");
const types_1 = require("../types");
exports.default = (async ({ request, response }) => {
    const user = types_1.createUserRequestSchema.parse(request.body);
    const [userBd] = await (0, repository_1.findUserByEmail)(user.email);
    if (userBd) {
        response.status = 401;
        return response.body = {
            code: "BadRequest",
            message: "User already exists"
        };
    }
    user.password = (0, service_1.hashPassword)(user.password);
    const [userCreated] = await (0, repository_1.createUserAccount)(user);
    const { password, createdAt, updatedAt, ...rest } = userCreated;
    (0, service_1.createSessionCookie)(rest, response);
    response.body = {
        code: "UserAccountCreated",
        user: rest
    };
});
