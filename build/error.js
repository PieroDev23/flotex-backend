"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const errorMiddleware = async (ctx, next) => {
    try {
        await next();
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            const body = {
                code: "InvalidBody",
                message: "The given request body is not valid.",
                data: {
                    issues: e.issues,
                },
            };
            ctx.response.status = 403;
            ctx.response.body = body;
        }
        else {
            console.log(e);
            const body = {
                code: "UnknownError",
                message: "An unknown error has ocurred.",
            };
            ctx.response.status = 403;
            ctx.response.body = body;
        }
    }
};
exports.errorMiddleware = errorMiddleware;
