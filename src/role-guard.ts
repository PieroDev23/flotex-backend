import { Middleware } from "koa";






export default ((role: "CUSTOMER" | "ADMIN"): Middleware => {
  return async (ctx, next) => {
    if (ctx.state.user.role !== role) {
      ctx.response.status = 403
      console.log("shit")
      return ctx.response.body = {
        code: "Unauthorized",
        message: "invalid role"
      }
    }
    await next();
  }
}) 