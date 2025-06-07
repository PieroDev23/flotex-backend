import Router from "@koa/router";
import listAddresses from "./http/list";
import createAddress from "./http/create";
import authGuard from "../auth-guard";



const addressesRouter = new Router({ prefix: "/addresses" });

addressesRouter.get("/list", authGuard, listAddresses);
addressesRouter.post("/", authGuard, createAddress);


export default addressesRouter;