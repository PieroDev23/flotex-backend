import { Middleware } from "koa";
import { deleteUserRequestSchema } from "../types";
import { deleteUser } from "../repository";

export default (async ({ params, response }) => {
  const { userId } = deleteUserRequestSchema.parse(params);
  const result = await deleteUser(userId);
  
  if (!result || result.length === 0) {
    response.status = 404;
    response.body = {
      code: "UserNotFound",
      message: "User not found"
    };
    return;
  }
  
  response.status = 200;
  response.body = {
    code: "UserDeleted",
    message: "User successfully deleted"
  };
}) as Middleware;