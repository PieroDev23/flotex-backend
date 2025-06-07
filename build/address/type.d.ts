import { z } from "zod";
export declare const addressSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodNumber;
    country: z.ZodString;
    city: z.ZodString;
    address: z.ZodString;
    reference: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: number;
    country: string;
    city: string;
    address: string;
    id?: string | undefined;
    reference?: string | undefined;
}, {
    userId: number;
    country: string;
    city: string;
    address: string;
    id?: string | undefined;
    reference?: string | undefined;
}>;
export type Address = z.infer<typeof addressSchema>;
