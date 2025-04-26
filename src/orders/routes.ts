import Router from "@koa/router";
import authGuard from "../auth-guard";
import createOrder from "./http/create";
import getOrder from "./http/get";


const ordersRouter = new Router({ prefix: "/orders" });

ordersRouter.get("/list", authGuard);
ordersRouter.get("/:orderId", getOrder);
ordersRouter.post("/", createOrder);

export default ordersRouter;