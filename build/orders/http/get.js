"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
const repository_2 = require("../../user/repository");
const repository_3 = require("../../address/repository");
exports.default = (async ({ request, response, ...ctx }) => {
    const { orderId } = types_1.getOrderRequestSchema.parse(ctx.params);
    const order = await (0, repository_1.selectOrder)(orderId);
    const orderItems = order.map(({ order_items: { quantity }, products: { name, price, imageUrl } }) => {
        return {
            quantity,
            name,
            price,
            imageUrl
        };
    });
    const [{ orders }] = order;
    const { createdAt, updatedAt, ...rest } = orders;
    const { userId, addressId, detail, shippingType, status, totalAmount, ...guestData } = rest;
    const baseOrderProps = {
        totalAmount,
        status,
        shippingType,
        detail,
        items: orderItems,
    };
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
    const [[currentAddress], [currentUser]] = await Promise.all([(0, repository_3.findOneAddressById)(addressId), (0, repository_2.findOneUserById)(userId)]);
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
    };
});
