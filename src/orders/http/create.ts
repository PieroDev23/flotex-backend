import { Middleware } from "koa";
import { createOrderRequestSchema } from "../types";
import { insertOrder, insertOrderItems } from "../repository";

export default (async ({ request, response }) => {
  const { products, ...order } = createOrderRequestSchema.parse(request.body);

  const newOrder = await insertOrder(order);

  if (!newOrder) {
    response.status = 500;
    return response.body = {
      code: "OrderCreationFailed",
      message: "Cannot create the order",
    }
  }

  const [{ orderId }] = newOrder;

  const res = await insertOrderItems(products, orderId);
  if (!res) {
    response.status = 500;
    return response.body = {
      code: "OrderCreationFailed",
      message: "Cannot create the order",
    }
  }

  response.body = {
    code: "OrderCreated",
    message: "Order successfully created",
    orderId,
  }

}) as Middleware;

