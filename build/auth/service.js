"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.deleteSessionCookie = exports.createSessionCookie = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../jwt"));
const hashPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync();
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
const createSessionCookie = (payload, response) => {
    const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60;
    response.set("Set-Cookie", `session=${jwt_1.default.create(payload, expirationTime)}; Max-Age=${expirationTime}; Secure; SameSite=Strict; Path=/; HttpOnly`);
};
exports.createSessionCookie = createSessionCookie;
const deleteSessionCookie = (response) => {
    response.set("Set-Cookie", "session=\"\"; Max-Age=0; Secure; SameSite=Strict; Path=/; HttpOnly");
};
exports.deleteSessionCookie = deleteSessionCookie;
const comparePassword = (password, hashed) => {
    return bcrypt_1.default.compareSync(password, hashed);
};
exports.comparePassword = comparePassword;
