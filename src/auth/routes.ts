import Router from "@koa/router";

import loginUser from "./http/login";
import registerUser from "./http/register";


const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export default authRouter;