import { BaseResponse } from "koa";
export declare const hashPassword: (password: string) => string;
export declare const createSessionCookie: (payload: Record<string, unknown>, response: BaseResponse) => void;
export declare const deleteSessionCookie: (response: BaseResponse) => void;
export declare const comparePassword: (password: string, hashed: string) => boolean;
