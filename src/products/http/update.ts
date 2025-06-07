import { Middleware } from "koa";
import { updateProduct } from "../repository";
import { productService } from "../service";
import { z } from "zod";

// Schema for updating product with optional image (multipart form data)
const updateProductFormSchema = z.object({
  productId: z.coerce.number(),
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.coerce.number().int().positive().optional(),
  sku: z.string().min(1).optional(),
  stock: z.coerce.number().int().min(0).optional(),
  categoryId: z.string().min(1).optional(),
  discount: z.coerce.number().int().min(0).max(100).nullable().optional(),
});

export default (async (ctx) => {
  try {
    const { request, response } = ctx;

    // Extract multipart form data using the service
    const { fields, file } = await productService.parseMultipartData(request);
    const formData = updateProductFormSchema.parse(fields);
    const productId = formData.productId;
    const { productId: _, ...fieldsToUpdate } = formData;
    let updateData: any = fieldsToUpdate;
    let imageInfo: any = null;

    // Handle image upload if file is present
    if (file) {
      try {
        const uploadResult = await productService.uploadProductImage(
          file,
          formData.sku || `update_${Date.now()}`
        );
        updateData.imageUrl = uploadResult.secure_url;
        imageInfo = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          format: uploadResult.format,
          size: uploadResult.bytes,
          updated: true
        };
      } catch (uploadError) {
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

    const productUpdated = await updateProduct({
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

  } catch (error) {
    console.error('Error updating product:', error);

    ctx.response.status = 500;
    ctx.response.body = {
      code: "ProductUpdateFailed",
      message: "Failed to update product",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}) as Middleware