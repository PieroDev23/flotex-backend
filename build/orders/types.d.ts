import { z } from "zod";
export declare const orderSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodOptional<z.ZodNumber>;
    addressId: z.ZodOptional<z.ZodString>;
    firstname: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    lastname: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    detail: z.ZodOptional<z.ZodString>;
    shippingType: z.ZodEnum<["SHIPPING", "INHOUSE"]>;
    status: z.ZodOptional<z.ZodEnum<["RECEIVED", "IN_PROGRESS", "SHIPPING", "DELIVERED", "CANCELED"]>>;
    totalAmount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    shippingType: "SHIPPING" | "INHOUSE";
    totalAmount: string;
    status?: "RECEIVED" | "IN_PROGRESS" | "SHIPPING" | "DELIVERED" | "CANCELED" | undefined;
    email?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    phone?: string | undefined;
    userId?: number | undefined;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    reference?: string | undefined;
    addressId?: string | undefined;
    detail?: string | undefined;
}, {
    id: string;
    shippingType: "SHIPPING" | "INHOUSE";
    totalAmount: string;
    status?: "RECEIVED" | "IN_PROGRESS" | "SHIPPING" | "DELIVERED" | "CANCELED" | undefined;
    email?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    phone?: string | undefined;
    userId?: number | undefined;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    reference?: string | undefined;
    addressId?: string | undefined;
    detail?: string | undefined;
}>;
export type Order = z.infer<typeof orderSchema>;
export declare const createOrderRequestSchema: z.ZodObject<Omit<z.objectUtil.extendShape<{
    id: z.ZodString;
    userId: z.ZodOptional<z.ZodNumber>;
    addressId: z.ZodOptional<z.ZodString>;
    firstname: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    lastname: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    detail: z.ZodOptional<z.ZodString>;
    shippingType: z.ZodEnum<["SHIPPING", "INHOUSE"]>;
    status: z.ZodOptional<z.ZodEnum<["RECEIVED", "IN_PROGRESS", "SHIPPING", "DELIVERED", "CANCELED"]>>;
    totalAmount: z.ZodString;
}, {
    products: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        imageUrl: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        name: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        price: number;
        quantity: number;
        imageUrl?: string | undefined;
    }, {
        id: number;
        name: string;
        price: number;
        quantity: number;
        imageUrl?: string | undefined;
    }>, "many">;
}>, "id">, "strip", z.ZodTypeAny, {
    products: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        imageUrl?: string | undefined;
    }[];
    shippingType: "SHIPPING" | "INHOUSE";
    totalAmount: string;
    status?: "RECEIVED" | "IN_PROGRESS" | "SHIPPING" | "DELIVERED" | "CANCELED" | undefined;
    email?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    phone?: string | undefined;
    userId?: number | undefined;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    reference?: string | undefined;
    addressId?: string | undefined;
    detail?: string | undefined;
}, {
    products: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        imageUrl?: string | undefined;
    }[];
    shippingType: "SHIPPING" | "INHOUSE";
    totalAmount: string;
    status?: "RECEIVED" | "IN_PROGRESS" | "SHIPPING" | "DELIVERED" | "CANCELED" | undefined;
    email?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    phone?: string | undefined;
    userId?: number | undefined;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    reference?: string | undefined;
    addressId?: string | undefined;
    detail?: string | undefined;
}>;
export type CreateOrderRequestSchema = z.infer<typeof createOrderRequestSchema>;
export declare const getOrderRequestSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId: string;
}, {
    orderId: string;
}>;
export type GetOrderRequestSchema = z.infer<typeof getOrderRequestSchema>;
