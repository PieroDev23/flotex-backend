"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const auth_guard_1 = __importDefault(require("../auth-guard"));
const create_1 = __importDefault(require("./http/create"));
const get_1 = __importDefault(require("./http/get"));
const ordersRouter = new router_1.default({ prefix: "/orders" });
ordersRouter.get("/list", auth_guard_1.default);
ordersRouter.get("/:orderId", get_1.default);
ordersRouter.post("/", create_1.default);
exports.default = ordersRouter;
