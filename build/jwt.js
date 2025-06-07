"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    create(payload, expirationTime) {
        return jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_KEY, { expiresIn: expirationTime });
    },
    verify(token) {
        return jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
    }
};
