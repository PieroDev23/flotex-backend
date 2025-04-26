import Router from "@koa/router";
import listCategories from "./http/list";


const categoriesRouter = new Router({ prefix: "/categories" });
categoriesRouter.get("/list", listCategories);

export default categoriesRouter;