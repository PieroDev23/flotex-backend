import { Middleware } from "koa";
import { selectProducts } from "../repository";
import { listProductsRequestSchema } from "../types";

export default (async ({ request, response }) => {
  const filters = request.query ? listProductsRequestSchema.parse(request.query) : {};
  const products = await selectProducts(filters);

  response.status = 200;
  response.body = products;
}) as Middleware
