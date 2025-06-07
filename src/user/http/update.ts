import { Middleware } from "koa";
import { updateUserRequestSchema } from "../types";
import { updateUser } from "../repository";
import { hashPassword } from "../../auth/service";

export default (async ({ request, response }) => {
  const { userId, fields } = updateUserRequestSchema.parse(request.body);
  
  // Hash password if it's being updated
  if (fields.password) {
    fields.password = hashPassword(fields.password);
  }
  
  const [updatedUser] = await updateUser(Number(userId), fields);
  
  if (!updatedUser) {
    response.status = 404;
    response.body = {
      code: "UserNotFound",
      message: "User not found"
    };
    return;
  }
  
  const { password, ...publicUserData } = updatedUser;
  response.status = 200;
  response.body =publicUserData
}) as Middleware;
