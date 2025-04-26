import { Middleware } from "koa";
import { createUserAccount, findUserByEmail } from "../repository";
import { createSessionCookie, hashPassword } from "../service";
import { createUserRequestSchema } from "../types";

export default (async ({ request, response }) => {
  const user = createUserRequestSchema.parse(request.body);

  const [userBd] = await findUserByEmail(user.email);
  if (userBd) {
    response.status = 401
    return response.body = {
      code: "BadRequest",
      message: "User already exists"
    }
  }
  
  user.password = hashPassword(user.password);
  const [userCreated] = await createUserAccount(user);
  const { password, createdAt, updatedAt, ...rest } = userCreated;
  
  createSessionCookie(rest, response);
  response.body = {
    code: "UserAccountCreated",
    user: rest
  }

}) as Middleware;