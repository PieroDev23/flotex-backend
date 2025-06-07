"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
exports.default = (async ({ request, response, ...ctx }) => {
    const [user] = await (0, repository_1.findOneUserById)(ctx.state.user.id);
    if (!user) {
        response.status = 403;
        response.body = null;
        return;
    }
    const { password, createdAt, updatedAt, ...publicUserData } = user;
    response.status = 200;
    response.body = {
        ...publicUserData
    };
});
