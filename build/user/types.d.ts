import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    id: z.ZodNumber;
    firstname: z.ZodString;
    lastname: z.ZodString;
    password: z.ZodString;
    phone: z.ZodNumber;
    email: z.ZodString;
    active: z.ZodEnum<["ACITVE", "INACTIVE"]>;
    role: z.ZodEnum<["ADMIN", "COSTUMER"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    email: string;
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    phone: number;
    active: "ACITVE" | "INACTIVE";
    role: "ADMIN" | "COSTUMER";
    createdAt: Date;
    updatedAt: Date;
}, {
    email: string;
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    phone: number;
    active: "ACITVE" | "INACTIVE";
    role: "ADMIN" | "COSTUMER";
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getUserRequestSchema: z.ZodObject<{
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: number;
}, {
    userId: number;
}>;
export declare const updateUserRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    fields: z.ZodObject<z.objectUtil.extendShape<Omit<{
        id: z.ZodOptional<z.ZodNumber>;
        firstname: z.ZodOptional<z.ZodString>;
        lastname: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodNumber>;
        email: z.ZodOptional<z.ZodString>;
        active: z.ZodOptional<z.ZodNullable<z.ZodEnum<["ACTIVE", "NOT_ACTIVE"]>>>;
        role: z.ZodOptional<z.ZodEnum<["CUSTOMER", "ADMIN"]>>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
    }, "id">, {
        password: z.ZodOptional<z.ZodString>;
    }>, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        firstname?: string | undefined;
        lastname?: string | undefined;
        password?: string | undefined;
        phone?: number | undefined;
        active?: "ACTIVE" | "NOT_ACTIVE" | null | undefined;
        role?: "CUSTOMER" | "ADMIN" | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }, {
        email?: string | undefined;
        firstname?: string | undefined;
        lastname?: string | undefined;
        password?: string | undefined;
        phone?: number | undefined;
        active?: "ACTIVE" | "NOT_ACTIVE" | null | undefined;
        role?: "CUSTOMER" | "ADMIN" | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    fields: {
        email?: string | undefined;
        firstname?: string | undefined;
        lastname?: string | undefined;
        password?: string | undefined;
        phone?: number | undefined;
        active?: "ACTIVE" | "NOT_ACTIVE" | null | undefined;
        role?: "CUSTOMER" | "ADMIN" | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    };
}, {
    userId: string;
    fields: {
        email?: string | undefined;
        firstname?: string | undefined;
        lastname?: string | undefined;
        password?: string | undefined;
        phone?: number | undefined;
        active?: "ACTIVE" | "NOT_ACTIVE" | null | undefined;
        role?: "CUSTOMER" | "ADMIN" | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    };
}>;
export declare const deleteUserRequestSchema: z.ZodObject<{
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: number;
}, {
    userId: number;
}>;
export declare const listUsersRequestSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    role: z.ZodOptional<z.ZodOptional<z.ZodEnum<["ADMIN", "CUSTOMER"]>>>;
    active: z.ZodOptional<z.ZodOptional<z.ZodEnum<["ACITVE", "NOT_ACTIVE"]>>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    active?: "NOT_ACTIVE" | "ACITVE" | undefined;
    role?: "CUSTOMER" | "ADMIN" | undefined;
}, {
    search?: string | undefined;
    active?: "NOT_ACTIVE" | "ACITVE" | undefined;
    role?: "CUSTOMER" | "ADMIN" | undefined;
}>;
export type User = z.infer<typeof userSchema>;
export type UpdateUserFields = z.infer<typeof updateUserRequestSchema>["fields"];
export type ListUserRequest = z.infer<typeof listUsersRequestSchema>;
