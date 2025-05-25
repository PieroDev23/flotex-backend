import { z } from "zod";



export const orderSchema = z.object({
  id: z.string().uuid(),
  userId: z.number().optional(),
  addressId: z.string().uuid().optional(),
  firstname: z.string().optional(),
  address: z.string().optional(),
  lastname: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  reference: z.string().optional(),
  phone: z.coerce.string().optional(),
  email: z.string().email().optional(),
  detail: z.string().optional(),
  shippingType: z.enum(["SHIPPING", "INHOUSE"]),
  status: z.enum(["RECEIVED", "IN_PROGRESS", "SHIPPING", "DELIVERED", "CANCELED"]).optional(),
  totalAmount: z.coerce.string()
});

export type Order = z.infer<typeof orderSchema>;

export const createOrderRequestSchema = orderSchema
  .merge(
    z.object({
      products: z.object({
        id: z.number(),
        imageUrl: z.string().optional(),
        price: z.number(),
        name: z.string(),
        quantity: z.number(),
      }).array()
    })).omit({ id: true });

export type CreateOrderRequestSchema = z.infer<typeof createOrderRequestSchema>;



export const getOrderRequestSchema = z.object({
  orderId: z.string().uuid()
});

export type GetOrderRequestSchema = z.infer<typeof getOrderRequestSchema>;