"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const list_1 = __importDefault(require("./http/list"));
const create_1 = __importDefault(require("./http/create"));
const auth_guard_1 = __importDefault(require("../auth-guard"));
const addressesRouter = new router_1.default({ prefix: "/addresses" });
addressesRouter.get("/list", auth_guard_1.default, list_1.default);
addressesRouter.post("/", auth_guard_1.default, create_1.default);
exports.default = addressesRouter;
