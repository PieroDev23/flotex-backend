import { Address } from "./type";
export declare const findAddressesByUserId: (userId: number) => Promise<{
    id: string;
    userId: number;
    country: string;
    city: string;
    address: string;
    reference: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const findOneAddressById: (addressId: string) => Promise<{
    id: string;
    userId: number;
    country: string;
    city: string;
    address: string;
    reference: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const insertAddress: (address: Address) => Promise<import("pg").QueryResult<never>>;
