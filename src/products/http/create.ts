import { Middleware } from "koa";
import { createProductRequestSchema } from "../types";
import { insertProduct } from "../repository";

export default (async ({ request, response }) => {
  const product = createProductRequestSchema.parse(request.body);
  const productCreated = await insertProduct(product);

  response.body = {
    product: productCreated
  }

}) as Middleware;