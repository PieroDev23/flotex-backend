import "dotenv/config";
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
    parseMultipartData(request: any): Promise<{
        fields: Record<string, any>;
        file: Buffer | null;
    }>;
}
declare class ProductService implements ProductImageUploadService {
    /**
     * Upload product image to Cloudinary
     * @param imageBuffer - Image buffer from multipart form data
     * @param sku - Product SKU for naming
     * @returns Promise with upload result
     */
    uploadProductImage(imageBuffer: Buffer, sku: string): Promise<CloudinaryUploadResult>;
    /**
     * Parse multipart/form-data from request body (requires multer middleware)
     * @param request - Koa request object (already processed by multer)
     * @returns Promise with form fields and file buffer
     */
    parseMultipartData(request: any): Promise<{
        fields: Record<string, any>;
        file: Buffer | null;
    }>;
}
export declare const productService: ProductService;
export {};
