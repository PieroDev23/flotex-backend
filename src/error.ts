import { Middleware } from "koa";
import { ZodError } from "zod";

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ZodError) {
      const body = {
        code: "InvalidBody",
        message: "The given request body is not valid.",
        data: {
          issues: e.issues,
        },
      };
      ctx.response.status = 403;
      ctx.response.body = body;
    } else {

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
