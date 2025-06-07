"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const list_1 = __importDefault(require("./http/list"));
const update_1 = __importDefault(require("./http/update"));
const create_1 = __importDefault(require("./http/create"));
const delete_1 = __importDefault(require("./http/delete"));
const get_1 = __importDefault(require("./http/get"));
const role_guard_1 = __importDefault(require("../role-guard"));
const auth_guard_1 = __importDefault(require("../auth-guard"));
const upload_1 = require("../middleware/upload");
const productsRouter = new router_1.default({ prefix: "/products" });
productsRouter.get("/list", list_1.default);
productsRouter.get("/:id", get_1.default);
// Create endpoint (multipart/form-data with required image)
productsRouter.post("/", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), upload_1.uploadSingle, create_1.default);
// Update endpoint (multipart/form-data with optional image)
productsRouter.put("/", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), upload_1.uploadSingle, update_1.default);
productsRouter.delete("/:id", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), delete_1.default);
exports.default = productsRouter;
