"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("./jwt"));
exports.default = (async (ctx, next) => {
    const { request, response, ...rest } = ctx;
    const data = request.headers.cookie?.split("session=");
    // Debug logs for products routes
    if (ctx.request.url.includes('/products')) {
        console.log(`🔐 Auth Guard - Route: ${ctx.request.url}`);
        console.log(`🔐 Auth Guard - Method: ${ctx.request.method}`);
        console.log(`🔐 Auth Guard - Cookie header: "${request.headers.cookie}"`);
        console.log(`🔐 Auth Guard - Has session data: ${!!data}`);
    }
    try {
        if (!data) {
            console.log(`❌ Auth Guard - No cookie data found for ${ctx.request.url}`);
            response.status = 403;
            return response.body = {
                user: null
            };
        }
        const [, token] = data;
        console.log(`🔐 Auth Guard - Token extracted: ${token ? 'YES' : 'NO'}`);
        const payload = jwt_1.default.verify(token);
        if (typeof payload === "string") {
            console.log(`❌ Auth Guard - Invalid token payload for ${ctx.request.url}`);
            response.status = 403;
            return response.body = {
                user: null
            };
        }
        console.log(`✅ Auth Guard - User authenticated: ${payload.email}`);
        rest.state.user = payload;
        await next();
    }
    catch (error) {
        console.log("❌ Auth Guard Error - ruta", ctx.request.url);
        console.log("❌ Auth Guard Error - details:", JSON.stringify(error));
        response.status = 403;
        response.body = {
            user: null
        };
    }
});
