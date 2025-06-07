"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const login_1 = __importDefault(require("./http/login"));
const register_1 = __importDefault(require("./http/register"));
const logout_1 = __importDefault(require("./http/logout"));
const authRouter = new router_1.default({ prefix: "/auth" });
authRouter.post("/login", login_1.default);
authRouter.post("/register", register_1.default);
authRouter.delete("/logout", logout_1.default);
exports.default = authRouter;
