import { eq } from "drizzle-orm"
import db from "../db"
import { orderItems, orders, products } from "../db/schema"
import { CreateOrderRequestSchema, Order } from "./types"


export const selectOrder =
  (orderId: string) => {
    return db
      .select()
      .from(orders)
      .innerJoin(orderItems, eq(orderItems.orderId, orderId))
      .innerJoin(products, eq(products.id, orderItems.productId))
      .where(eq(orders.id, orderId));
  }

export const insertOrder = async (
  order: Omit<CreateOrderRequestSchema, "products">
) => {
  const {
    totalAmount,
    address,
    addressId,
    city,
    country,
    detail,
    email,
    userId,
    firstname,
    lastname,
    phone,
    reference,
    shippingType,
  } = order;

  return db.transaction(async (tx) => {
    try {
      const baseValues = {
        totalAmount,
        addressId,
        userId,
        shippingType,
        detail,
      };

      const guestValues = addressId
        ? {}
        : {
          guestCity: city,
          guestCountry: country,
          guestAddress: address,
          guestEmail: email,
          guestFirstname: firstname,
          guestLastname: lastname,
          guestPhone: phone,
          guestReference: reference,
        };

      return await tx
        .insert(orders)
        .values({
          ...baseValues,
          ...guestValues,
        })
        .returning({ orderId: orders.id });

    } catch {
      tx.rollback();
      return null;
    }
  });
};

export const insertOrderItems =
  async (products: CreateOrderRequestSchema['products'], orderId: string) => {
    return db.transaction(async (tx) => {
      try {
        return await tx
          .insert(orderItems)
          .values(products.map(p =>
            ({ productId: p.id, quantity: p.quantity, orderId })))
          .returning({ insertedId: orderItems.orderId })
      } catch {
        tx.rollback();
        return null;
      }
    })
  }

export const updateOrder =
  async (status: Order['status']) => {
    return db
      .update(orders)
      .set({ status });
  }