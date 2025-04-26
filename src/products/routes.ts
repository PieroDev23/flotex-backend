import Router from "@koa/router";

import listProducts from "./http/list";
import updateProduct from "./http/update";
import createProduct from "./http/create";
import deleteProduct from "./http/delete";
import getProduct from "./http/get";

import roleGuard from "../role-guard";
import authGuard from "../auth-guard";

const productsRouter = new Router({ prefix: "/products" });

productsRouter.get("/list", listProducts);
productsRouter.get("/:id", getProduct);
productsRouter.post("/", authGuard, roleGuard("ADMIN"), createProduct);
productsRouter.put("/", authGuard, roleGuard("ADMIN"), updateProduct);
productsRouter.delete("/:id", authGuard, roleGuard("ADMIN"), deleteProduct)

export default productsRouter;