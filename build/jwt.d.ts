import "dotenv/config";
import jwt from "jsonwebtoken";
declare const _default: {
    create(payload: Record<string, unknown>, expirationTime: number): string;
    verify(token: string): string | jwt.JwtPayload;
};
export default _default;
