import { Middleware } from "koa";
import { findAllUsers } from "../repository";
import { listUsersRequestSchema } from "../types";

export default (async ({ request, response }) => {
  const filters = request.query ? listUsersRequestSchema.parse(request.query) : undefined;
  const users = await findAllUsers(filters);
  
  // Remove sensitive information
  const publicUsers = users.map(({ password, ...userData }) => userData);
  
  response.status = 200;
  response.body = publicUsers;
}) as Middleware;
