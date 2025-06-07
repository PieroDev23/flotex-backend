"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const service_1 = require("../service");
const zod_1 = require("zod");
// Schema for updating product with optional image (multipart form data)
const updateProductFormSchema = zod_1.z.object({
    productId: zod_1.z.coerce.number(),
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    price: zod_1.z.coerce.number().int().positive().optional(),
    sku: zod_1.z.string().min(1).optional(),
    stock: zod_1.z.coerce.number().int().min(0).optional(),
    categoryId: zod_1.z.string().min(1).optional(),
    discount: zod_1.z.coerce.number().int().min(0).max(100).nullable().optional(),
});
exports.default = (async (ctx) => {
    try {
        const { request, response } = ctx;
        // Extract multipart form data using the service
        const { fields, file } = await service_1.productService.parseMultipartData(request);
        const formData = updateProductFormSchema.parse(fields);
        const productId = formData.productId;
        const { productId: _, ...fieldsToUpdate } = formData;
        let updateData = fieldsToUpdate;
        let imageInfo = null;
        // Handle image upload if file is present
        if (file) {
            try {
                const uploadResult = await service_1.productService.uploadProductImage(file, formData.sku || `update_${Date.now()}`);
                updateData.imageUrl = uploadResult.secure_url;
                imageInfo = {
                    url: uploadResult.secure_url,
                    publicId: uploadResult.public_id,
                    format: uploadResult.format,
                    size: uploadResult.bytes,
                    updated: true
                };
            }
            catch (uploadError) {
                response.status = 500;
                response.body = {
                    code: "ImageUploadFailed",
                    message: "Failed to upload image to Cloudinary",
                    error: uploadError instanceof Error ? uploadError.message : "Unknown upload error"
                };
                return;
            }
        }
        // Only update if there are fields to update
        if (Object.keys(updateData).length === 0) {
            response.status = 400;
            response.body = {
                code: "NoFieldsToUpdate",
                message: "No fields provided for update"
            };
            return;
        }
        const productUpdated = await (0, repository_1.updateProduct)({
            productId,
            fields: updateData
        });
        if (!productUpdated || productUpdated.length === 0) {
            response.status = 404;
            response.body = {
                code: "ProductNotFound",
                message: "Product not found"
            };
            return;
        }
        response.status = 200;
        response.body = {
            code: "ProductUpdated",
            message: "Product updated successfully",
            product: productUpdated[0],
            ...(imageInfo && { imageInfo })
        };
    }
    catch (error) {
        console.error('Error updating product:', error);
        ctx.response.status = 500;
        ctx.response.body = {
            code: "ProductUpdateFailed",
            message: "Failed to update product",
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
});
