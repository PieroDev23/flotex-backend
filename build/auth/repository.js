"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAccount = exports.findUserByEmail = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const findUserByEmail = async (email) => {
    return db_1.default
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
};
exports.findUserByEmail = findUserByEmail;
const createUserAccount = async (user) => {
    return db_1.default
        .insert(schema_1.users)
        .values(user)
        .returning();
};
exports.createUserAccount = createUserAccount;
