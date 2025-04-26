import { Middleware } from "koa";
import { getOrderRequestSchema } from "../types";
import { selectOrder } from "../repository";



export default (async ({ request, response, ...ctx }) => {
  const { orderId } = getOrderRequestSchema.parse(ctx.params);
  const order = await selectOrder(orderId);
  const orderItems = order.map(({ order_items: { quantity }, products: { name, price, imageUrl } }) => {
    return {
      quantity,
      name,
      price,
      imageUrl
    }
  })
  const [{ orders }] = order;
  const { createdAt, updatedAt, userId, addressId, ...rest } = orders;
  response.body = {
    ...rest,
    items: orderItems
  };
}) as Middleware