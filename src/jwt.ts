import "dotenv/config";
import jwt from "jsonwebtoken";


export default {
  create(payload: Record<string, unknown>, expirationTime: number) {
    return jwt.sign(
      payload,
      process.env.PRIVATE_KEY!,
      { expiresIn: expirationTime }
    );
  },
  verify(token: string) {
    return jwt.verify(token, process.env.PRIVATE_KEY!);
  }
}