"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const router_1 = __importDefault(require("@koa/router"));
const get_1 = __importDefault(require("./http/get"));
const getById_1 = __importDefault(require("./http/getById"));
const list_1 = __importDefault(require("./http/list"));
const update_1 = __importDefault(require("./http/update"));
const delete_1 = __importDefault(require("./http/delete"));
const auth_guard_1 = __importDefault(require("../auth-guard"));
const role_guard_1 = __importDefault(require("../role-guard"));
exports.usersRouter = new router_1.default({
    prefix: "/users"
});
exports.usersRouter.get("/me", auth_guard_1.default, get_1.default);
exports.usersRouter.get("/list", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), list_1.default);
exports.usersRouter.get("/:userId", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), getById_1.default);
exports.usersRouter.put("/", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), update_1.default);
exports.usersRouter.delete("/:userId", auth_guard_1.default, (0, role_guard_1.default)("ADMIN"), delete_1.default);
exports.default = exports.usersRouter;
