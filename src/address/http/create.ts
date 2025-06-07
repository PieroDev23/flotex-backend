import { Middleware } from "koa";
import { addressSchema } from "../type";
import { insertAddress } from "../repository";


export default (async ({ request, response }) => {
  const address = addressSchema.parse(request.body);
  const addressCreated = await insertAddress(address);
  response.status = 200;
  response.body = addressCreated;
}) as Middleware;