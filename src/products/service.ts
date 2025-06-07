import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export interface ProductImageUploadService {
  uploadProductImage(imageBuffer: Buffer, sku: string): Promise<CloudinaryUploadResult>;
  parseMultipartData(request: any): Promise<{ fields: Record<string, any>, file: Buffer | null }>;
}

class ProductService implements ProductImageUploadService {
  /**
   * Upload product image to Cloudinary
   * @param imageBuffer - Image buffer from multipart form data
   * @param sku - Product SKU for naming
   * @returns Promise with upload result
   */
  async uploadProductImage(imageBuffer: Buffer, sku: string): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: 'flotex/products',
        resource_type: 'image' as const,
        format: 'webp',
        quality: 'auto:good',
        public_id: `product_${sku}_${Date.now()}`,
      };

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else if (result) {
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              url: result.url,
              format: result.format,
              width: result.width,
              height: result.height,
              bytes: result.bytes,
            });
          } else {
            reject(new Error('Upload failed: No result returned'));
          }
        }
      ).end(imageBuffer);
    });
  }

  /**
   * Parse multipart/form-data from request body (requires multer middleware)
   * @param request - Koa request object (already processed by multer)
   * @returns Promise with form fields and file buffer
   */
  async parseMultipartData(request: any): Promise<{ fields: Record<string, any>, file: Buffer | null }> {
    // Since we still need multer to parse multipart data properly,
    // this method extracts the already parsed data
    const fields: Record<string, any> = {};
    const body = request.body || {};

    // Extract all form fields
    Object.keys(body).forEach(key => {
      fields[key] = body[key];
    });

    // Extract file buffer from multer
    const file = request.file ? request.file.buffer : null;

    return Promise.resolve({ fields, file });
  }
}

// Export service instance
export const productService = new ProductService();
