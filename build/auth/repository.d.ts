import { CreateUserRequest } from "./types";
export declare const findUserByEmail: (email: string) => Promise<{
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    phone: number;
    email: string;
    active: "ACTIVE" | "NOT_ACTIVE" | null;
    role: "CUSTOMER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const createUserAccount: (user: CreateUserRequest) => Promise<{
    email: string;
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    phone: number;
    active: "ACTIVE" | "NOT_ACTIVE" | null;
    role: "CUSTOMER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
}[]>;
