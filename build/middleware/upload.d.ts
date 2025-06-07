import multer from '@koa/multer';
declare const upload: multer.Instance;
export declare const uploadSingle: import("koa").Middleware<import("koa").DefaultState, import("koa").DefaultContext, any>;
export default upload;
