import { Middleware } from "koa";
import { loginUserRequestSchema } from "../types";
import { findUserByEmail } from "../repository";
import { comparePassword, createSessionCookie } from "../service";



export default (async ({ request, response }) => {
  const { email, password } = loginUserRequestSchema.parse(request.body);

  const [userBd] = await findUserByEmail(email);
  if (!userBd) {
    response.status = 401
    return response.body = {
      code: "BadRequest",
      message: "Login failed"
    }
  }

  const isPasswordCorrect = comparePassword(password, userBd.password);
  if (!isPasswordCorrect) {
    response.status = 401
    return response.body = {
      code: "BadRequest",
      message: "Login failed"
    }
  }

  const { password: passwordBd, createdAt, updatedAt, ...rest } = userBd;
  createSessionCookie(rest, response);

  response.body = {
    code: "LoginSuccess",
    user: rest,
  };

}) as Middleware