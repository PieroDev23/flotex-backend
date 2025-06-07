"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionalMulter = void 0;
const upload_1 = require("./upload");
/**
 * Conditional multer middleware that only processes multipart/form-data
 * and skips JSON requests to avoid conflicts with bodyParser
 */
const conditionalMulter = async (ctx, next) => {
    const contentType = ctx.request.headers['content-type'] || '';
    // Only apply multer for multipart/form-data
    if (contentType.includes('multipart/form-data')) {
        // Apply multer middleware
        await (0, upload_1.uploadSingle)(ctx, next);
    }
    else {
        // Skip multer for JSON requests
        await next();
    }
};
exports.conditionalMulter = conditionalMulter;
exports.default = exports.conditionalMulter;
