"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const repository_1 = require("../repository");
const service_1 = require("../service");
exports.default = (async (ctx) => {
    try {
        const { request, response } = ctx;
        // Extract multipart data using the service
        const { fields, file } = await service_1.productService.parseMultipartData(request);
        if (!file) {
            response.status = 400;
            response.body = {
                code: "ImageRequired",
                message: "Product image is required"
            };
            return;
        }
        // Parse form data
        const formData = types_1.createProductFormSchema.parse(fields);
        // Upload image to Cloudinary using the service
        let uploadResult;
        try {
            uploadResult = await service_1.productService.uploadProductImage(file, formData.sku);
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
        // Create product with uploaded image URL
        const productData = {
            ...formData,
            imageUrl: uploadResult.secure_url,
        };
        const productCreated = await (0, repository_1.insertProduct)(productData);
        response.status = 201;
        response.body = {
            code: "ProductCreated",
            message: "Product created successfully",
            product: productCreated[0],
            imageInfo: {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                format: uploadResult.format,
                size: uploadResult.bytes,
            }
        };
    }
    catch (error) {
        console.error('Error creating product:', error);
        ctx.response.status = 500;
        ctx.response.body = {
            code: "ProductCreationFailed",
            message: "Failed to create product",
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
});
