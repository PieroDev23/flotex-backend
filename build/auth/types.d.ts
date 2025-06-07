import { z } from "zod";
export declare const createUserRequestSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    firstname: z.ZodString;
    lastname: z.ZodString;
    password: z.ZodString;
    phone: z.ZodNumber;
    email: z.ZodString;
    active: z.ZodOptional<z.ZodNullable<z.ZodEnum<["ACTIVE", "NOT_ACTIVE"]>>>;
    role: z.ZodOptional<z.ZodEnum<["CUSTOMER", "ADMIN"]>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id">, "strip", z.ZodTypeAny, {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    phone: number;
    active?: "ACTIVE" | "NOT_ACTIVE" | null | undefined;
    role?: "CUSTOMER" | "ADMIN" | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    phone: number;
    active?: "ACTIVE" | "NOT_ACTIVE" | null | undefined;
    role?: "CUSTOMER" | "ADMIN" | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare const loginUserRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;
