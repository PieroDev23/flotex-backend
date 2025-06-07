import { Middleware } from "koa";
import { findOneUserById } from "../repository";




export default (async ({ request, response, ...ctx }) => {
  const [user] = await findOneUserById(ctx.state.user.id);

  if (!user) {
    response.status = 403;
    response.body = null
    return;
  }

  const { password, createdAt, updatedAt, ...publicUserData } = user;

  response.status = 200;
  response.body = {
    ...publicUserData
  };

}) as Middleware;