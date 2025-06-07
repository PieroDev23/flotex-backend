import { Middleware } from 'koa';
/**
 * Conditional multer middleware that only processes multipart/form-data
 * and skips JSON requests to avoid conflicts with bodyParser
 */
export declare const conditionalMulter: Middleware;
export default conditionalMulter;
