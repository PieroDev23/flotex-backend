import { bodyParser } from "@koa/bodyparser";
import Router from "@koa/router";
import { sql } from "drizzle-orm";
import koa from "koa";
import morgan from "koa-morgan";
import authRouter from "./auth/routes";
import categoriesRouter from "./categories/routes";
import db from "./db";
import { errorMiddleware } from "./error";
import ordersRouter from "./orders/routes";
import productsRouter from "./products/routes";
import usersRouter from "./user/routes";
import addressesRouter from "./address/routes";

const koaApp = new koa();
const koaRouter = new Router({ prefix: "/live" });

// Middlewares - Error middleware MUST be first to catch all errors
koaApp.use(errorMiddleware);

// Logging middleware
koaApp.use(morgan("dev"));

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
  } else {
    await bodyParser()(ctx, next);
  }
});

// Routes
koaRouter.get("/health", async (ctx) => {
  try {
    const statement = sql`SELECT version()`;
    const res = await db.execute(statement);
    ctx.response.body = {
      code: "ApiHealthy",
      statusCode: "OK",
      message: "Api is healthy",
      res
    }
  } catch {
    ctx.response.body = {
      code: "FailedDBQuery",
      message: "No se pudo consultar la base de datos",
      statusCode: "INTERNAL_SERVER_ERROR",
    }
  }
});

// Setup routes
koaRouter.use(authRouter.routes());
koaRouter.use(ordersRouter.routes());
koaRouter.use(productsRouter.routes());
koaRouter.use(categoriesRouter.routes());
koaRouter.use(addressesRouter.routes());
koaRouter.use(usersRouter.routes());

koaApp.use(koaRouter.routes());

koaApp.listen(process.env.APP_PORT!, () => {
  console.log(`✅ App running on port ${process.env.APP_PORT}`);
});
