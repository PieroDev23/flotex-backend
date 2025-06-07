"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const repository_1 = require("../repository");
const cloudinary_1 = require("../../services/cloudinary");
// Schema for updating product with optional image
const updateProductWithImageSchema = zod_1.z.object({
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
        // Parse form data
        const formData = updateProductWithImageSchema.parse(request.body);
        const { productId, ...updateFields } = formData;
        // Check if file was uploaded
        const file = request.file;
        let imageUrl = undefined;
        if (file) {
            // Upload new image to Cloudinary
            const uploadResult = await (0, cloudinary_1.uploadImage)(file.buffer, 'flotex/products', `product_${formData.sku || 'update'}_${Date.now()}`);
            imageUrl = uploadResult.secure_url;
            // TODO: Optionally delete old image
            // You might want to get the old product first and delete its image
            // const [oldProduct] = await findProductById(productId);
            // if (oldProduct?.imageUrl) {
            //   const oldPublicId = extractPublicId(oldProduct.imageUrl);
            //   if (oldPublicId) {
            //     await deleteImage(oldPublicId);
            //   }
            // }
        }
        // Prepare update data
        const updateData = {
            ...updateFields,
            ...(imageUrl && { imageUrl }),
        };
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
            ...(imageUrl && {
                imageInfo: {
                    url: imageUrl,
                    updated: true
                }
            })
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
