import { Middleware } from "koa";
import { deleteProductRequestSchema } from "../types";
import { deleteProduct } from "../repository";


export default (async ({ params, response }) => {
  const { id } = deleteProductRequestSchema.parse(params);
  await deleteProduct(id);

  response.body = {
    code: "Ok",
    message: "Producto borrado."
  }

}) as Middleware