import { Middleware } from "koa";
import { getOrderRequestSchema } from "../types";
import { selectOrder } from "../repository";
import { findOneUserById } from "../../user/repository";
import { findOneAddressById } from "../../address/repository";



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
  const { createdAt, updatedAt, ...rest } = orders;
  const {
    userId,
    addressId,
    detail,
    shippingType,
    status,
    totalAmount,
    ...guestData } = rest;

  const baseOrderProps = {
    totalAmount,
    status,
    shippingType,
    detail,
    items: orderItems,
  }

  if (!userId || !addressId) {
    return response.body = {
      ...baseOrderProps,
      address: guestData.guestAddress,
      city: guestData.guestCity,
      country: guestData.guestCountry,
      reference: guestData.guestReference,
      lastname: guestData.guestLastname,
      firstname: guestData.guestFirstname,
      email: guestData.guestEmail,
      phone: guestData.guestPhone,
    };
  }

  const [[currentAddress], [currentUser]] = await Promise.all([findOneAddressById(addressId), findOneUserById(userId)]);
  const { firstname, lastname, email, phone } = currentUser;
  const { address, reference, city, country } = currentAddress;

  return response.body = {
    ...baseOrderProps,
    firstname,
    lastname,
    email,
    phone,
    address,
    reference,
    city,
    country
  }

}) as Middleware