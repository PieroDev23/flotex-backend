import { Middleware } from "koa";
import { selectProducts } from "../repository";
import { listProductsRequestSchema } from "../types";

export default (async ({ request, response }) => {
  const query = listProductsRequestSchema.parse(request.query);
  const products = await selectProducts(query);
  response.body = products;
}) as Middleware
