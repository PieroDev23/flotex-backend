import Router from "@koa/router";

import loginUser from "./http/login";
import registerUser from "./http/register";
import logoutUser from "./http/logout";


const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.delete("/logout", logoutUser);

export default authRouter;