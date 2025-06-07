"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const list_1 = __importDefault(require("./http/list"));
const categoriesRouter = new router_1.default({ prefix: "/categories" });
categoriesRouter.get("/list", list_1.default);
exports.default = categoriesRouter;
