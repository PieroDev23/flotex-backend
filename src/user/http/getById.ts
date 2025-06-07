import { Middleware } from "koa";
import { getUserRequestSchema } from "../types";
import { findOneUserById } from "../repository";

export default (async ({ params, response }) => {
  const { userId } = getUserRequestSchema.parse(params);
  const [user] = await findOneUserById(userId);

  if (!user) {
    response.status = 404;
    response.body = {
      code: "UserNotFound",
      message: "User not found"
    };
    return;
  }

  const { password, ...publicUserData } = user;

  response.status = 200;
  response.body = publicUserData

}) as Middleware;