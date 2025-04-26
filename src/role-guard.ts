import { Middleware } from "koa";






export default ((role: "CUSTOMER" | "ADMIN"): Middleware => {
  return (ctx, next) => {
    if (ctx.state.user.role !== role) {
      ctx.response.status = 403
      return ctx.response.body = {
        code: "Unauthorized",
        message: "invalid role"
      }
    }
    next();
  }
}) 