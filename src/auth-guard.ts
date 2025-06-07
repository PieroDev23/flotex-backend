import { Middleware } from "koa";
import jwt from "./jwt";



export default (async (ctx, next) => {
  const { request, response, ...rest } = ctx;
  const data = request.headers.cookie?.split("session=");

  // consolea la ruta
  try {
    if (!data) {
      response.status = 403
      return response.body = {
        user: null
      };
    }
    const [, token] = data;
    const payload = jwt.verify(token);
    if (typeof payload === "string") {
      response.status = 403
      return response.body = {
        user: null
      }
    }
    rest.state.user = payload;
    await next();
  } catch (error) {
    console.log("ruta", ctx.request.url);
    console.log(JSON.stringify(error))
    response.status = 403;
    response.body = {
      user: null
    }
  }
}) as Middleware