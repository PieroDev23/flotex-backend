import { Middleware } from "koa";
import { getProductRequestSchema } from "../types";
import { findProductById } from "../repository";






export default (async (ctx) => {
  const { id } = getProductRequestSchema.parse(ctx.params);
  const [product] = await findProductById(id);

  if (!product) {
    return ctx.response.body = {
      code: "NotFound",
      product: null
    }
  }

  ctx.response.body = product

}) as Middleware