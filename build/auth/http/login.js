"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
const service_1 = require("../service");
exports.default = (async ({ request, response }) => {
    const { email, password } = types_1.loginUserRequestSchema.parse(request.body);
    const [userBd] = await (0, repository_1.findUserByEmail)(email);
    if (!userBd) {
        response.status = 401;
        return response.body = {
            code: "BadRequest",
            message: "Login failed"
        };
    }
    const isPasswordCorrect = (0, service_1.comparePassword)(password, userBd.password);
    if (!isPasswordCorrect) {
        response.status = 401;
        return response.body = {
            code: "BadRequest",
            message: "Login failed"
        };
    }
    const { password: passwordBd, createdAt, updatedAt, ...rest } = userBd;
    (0, service_1.createSessionCookie)(rest, response);
    response.body = rest;
});
