"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyparser_1 = require("@koa/bodyparser");
const router_1 = __importDefault(require("@koa/router"));
const drizzle_orm_1 = require("drizzle-orm");
const koa_1 = __importDefault(require("koa"));
const koa_morgan_1 = __importDefault(require("koa-morgan"));
const routes_1 = __importDefault(require("./auth/routes"));
const routes_2 = __importDefault(require("./categories/routes"));
const db_1 = __importDefault(require("./db"));
const error_1 = require("./error");
const routes_3 = __importDefault(require("./orders/routes"));
const routes_4 = __importDefault(require("./products/routes"));
const routes_5 = __importDefault(require("./user/routes"));
const routes_6 = __importDefault(require("./address/routes"));
const koaApp = new koa_1.default();
const koaRouter = new router_1.default({ prefix: "/live" });
// Middlewares - Error middleware MUST be first to catch all errors
koaApp.use(error_1.errorMiddleware);
// Logging middleware
koaApp.use((0, koa_morgan_1.default)("dev"));
// Conditional bodyParser - Skip bodyParser for multipart/form-data
koaApp.use(async (ctx, next) => {
    const contentType = ctx.request.headers['content-type'] || '';
    // Debug: Log all headers for products routes
    if (ctx.request.url.includes('/products') && ctx.request.method === "PUT") {
        console.log(`📋 Content-Type: "${contentType}"`);
    }
    // Skip bodyParser for multipart/form-data to avoid conflicts with multer
    const isMultipart = contentType.includes('multipart/form-data') ||
        contentType.includes('multipart') ||
        ctx.request.headers['content-type']?.toLowerCase().includes('multipart');
    if (isMultipart) {
        await next();
    }
    else {
        await (0, bodyparser_1.bodyParser)()(ctx, next);
    }
});
// Routes
koaRouter.get("/health", async (ctx) => {
    try {
        const statement = (0, drizzle_orm_1.sql) `SELECT version()`;
        const res = await db_1.default.execute(statement);
        ctx.response.body = {
            code: "ApiHealthy",
            statusCode: "OK",
            message: "Api is healthy",
            res
        };
    }
    catch {
        ctx.response.body = {
            code: "FailedDBQuery",
            message: "No se pudo consultar la base de datos",
            statusCode: "INTERNAL_SERVER_ERROR",
        };
    }
});
// Setup routes
koaRouter.use(routes_1.default.routes());
koaRouter.use(routes_3.default.routes());
koaRouter.use(routes_4.default.routes());
koaRouter.use(routes_2.default.routes());
koaRouter.use(routes_6.default.routes());
koaRouter.use(routes_5.default.routes());
koaApp.use(koaRouter.routes());
koaApp.listen(process.env.APP_PORT, () => {
    console.log(`✅ App running on port ${process.env.APP_PORT}`);
});
