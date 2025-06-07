import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';
export interface UploadResult {
    public_id: string;
    secure_url: string;
    url: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
}
/**
 * Upload an image to Cloudinary
 * @param buffer - Image buffer
 * @param folder - Cloudinary folder (optional)
 * @param publicId - Custom public ID (optional)
 * @returns Promise with upload result
 */
export declare const uploadImage: (buffer: Buffer, folder?: string, publicId?: string) => Promise<UploadResult>;
/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Promise with deletion result
 */
export declare const deleteImage: (publicId: string) => Promise<any>;
/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if not a valid Cloudinary URL
 */
export declare const extractPublicId: (url: string) => string | null;
export default cloudinary;
