import Router from "@koa/router";

import listProducts from "./http/list";
import updateProduct from "./http/update";
import createProduct from "./http/create";
import deleteProduct from "./http/delete";
import getProduct from "./http/get";

import roleGuard from "../role-guard";
import authGuard from "../auth-guard";
import { uploadSingle } from "../middleware/upload";

const productsRouter = new Router({ prefix: "/products" });

productsRouter.get("/list", listProducts);
productsRouter.get("/:id", getProduct);
// Create endpoint (multipart/form-data with required image)
productsRouter.post("/", authGuard, roleGuard("ADMIN"), uploadSingle, createProduct);
// Update endpoint (multipart/form-data with optional image)
productsRouter.put("/", authGuard, roleGuard("ADMIN"), uploadSingle, updateProduct);
productsRouter.delete("/:id", authGuard, roleGuard("ADMIN"), deleteProduct);

export default productsRouter;