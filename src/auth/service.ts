import bcrypt from "bcrypt";
import { BaseResponse } from "koa";
import jwt from "../jwt";


export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export const createSessionCookie = (payload: Record<string, unknown>, response: BaseResponse) => {
  const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60;
  response.set(
    "Set-Cookie",
    `session=${jwt.create(payload, expirationTime)}; Max-Age=${expirationTime}; Secure; SameSite=Strict; Path=/; HttpOnly`,
  );
}

export const comparePassword = (password: string, hashed: string) => {
  return bcrypt.compareSync(password, hashed);
}