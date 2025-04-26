import { Middleware } from "koa";
import { updateProductRequestSchema } from "../types";
import { updateProduct } from "../repository";

export default (async ({ request, response }) => {
  const query = updateProductRequestSchema.parse(request.body);
  const productUpdated = await updateProduct(query);

  response.body = {
    code: "ProductUpdated",
    product: productUpdated
  };

}) as Middleware