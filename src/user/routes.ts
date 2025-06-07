import Router from "@koa/router";

import getPublicUser from "./http/get";
import getUserById from "./http/getById";
import listUsers from "./http/list";
import updateUser from "./http/update";
import deleteUser from "./http/delete";
import authGuard from "../auth-guard";
import roleGuard from "../role-guard";

export const usersRouter = new Router({
  prefix: "/users"
});

usersRouter.get("/me", authGuard, getPublicUser);
usersRouter.get("/list", authGuard, roleGuard("ADMIN"), listUsers);
usersRouter.get("/:userId", authGuard, roleGuard("ADMIN"), getUserById);
usersRouter.put("/", authGuard, roleGuard("ADMIN"), updateUser);
usersRouter.delete("/:userId", authGuard, roleGuard("ADMIN"), deleteUser);

export default usersRouter;
