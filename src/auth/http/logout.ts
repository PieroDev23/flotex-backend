import { Middleware } from "koa";
import { deleteSessionCookie } from "../service";



export default (async ({ response }) => {
  deleteSessionCookie(response)
  response.status = 200;
  response.body = { message: "Sesión cerrada correctamente", code: "SuccessfullyLogout" };
}) as Middleware;