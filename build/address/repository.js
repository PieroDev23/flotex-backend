"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAddress = exports.findOneAddressById = exports.findAddressesByUserId = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const findAddressesByUserId = async (userId) => {
    return await db_1.default
        .select()
        .from(schema_1.addresses)
        .where((0, drizzle_orm_1.eq)(schema_1.addresses.userId, userId));
};
exports.findAddressesByUserId = findAddressesByUserId;
const findOneAddressById = async (addressId) => {
    return await db_1.default
        .select()
        .from(schema_1.addresses)
        .where((0, drizzle_orm_1.eq)(schema_1.addresses.id, addressId));
};
exports.findOneAddressById = findOneAddressById;
const insertAddress = async (address) => {
    return await db_1.default
        .insert(schema_1.addresses)
        .values(address);
};
exports.insertAddress = insertAddress;
