import { Middleware } from "koa";
import { findAddressesByUserId } from "../repository";



export default (async ({ request, response, ...ctx }) => {
  const addresses = await findAddressesByUserId(ctx.state.user.id);
  response.status = 200;
  response.body = addresses;
}) as Middleware;