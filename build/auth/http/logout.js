"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../service");
exports.default = (async ({ response }) => {
    (0, service_1.deleteSessionCookie)(response);
    response.status = 200;
    response.body = { message: "Sesión cerrada correctamente", code: "SuccessfullyLogout" };
});
