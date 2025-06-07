"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
exports.default = (async ({ request, response, ...ctx }) => {
    const addresses = await (0, repository_1.findAddressesByUserId)(ctx.state.user.id);
    response.status = 200;
    response.body = addresses;
});
