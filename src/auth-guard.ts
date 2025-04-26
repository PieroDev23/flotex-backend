import { Middleware } from "koa";
import jwt from "./jwt";



export default (async (ctx, next) => {
  const { request, response, ...rest } = ctx;
  const data = request.headers.cookie?.split("session=");
  try {
    if (!data) {
      response.status = 401
      return response.body = {
        code: "Unauthorized",
        message: "bad auth"
      }
    }

    const [, token] = data;
    const payload = jwt.verify(token);

    if (typeof payload === "string") {
      response.status = 401
      return response.body = {
        code: "Unauthorized",
        message: "bad auth"
      }
    }

    rest.state.user = payload;

    next();
  } catch {
    response.status = 401;
    response.body = {
      code: "Unauthorized",
      message: "bad auth"
    }
  }
}) as Middleware