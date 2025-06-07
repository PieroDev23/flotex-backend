"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
const schema_1 = require("../../db/schema");
exports.default = (async ({ response }) => {
    const cats = await db_1.default.select({
        id: schema_1.categories.id,
        name: schema_1.categories.name,
        imageUrl: schema_1.categories.imageUrl,
    }).from(schema_1.categories);
    response.body = cats;
});
