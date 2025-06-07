import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
export const uploadImage = async (
  buffer: Buffer,
  folder: string = 'flotex/products',
  publicId?: string
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      resource_type: 'image',
      format: 'webp', // Convert to WebP for better compression
      quality: 'auto:good', // Automatic quality optimization
      fetch_format: 'auto', // Automatic format selection
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
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
    ).end(buffer);
  });
};

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Promise with deletion result
 */
export const deleteImage = async (publicId: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error}`);
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if not a valid Cloudinary URL
 */
export const extractPublicId = (url: string): string | null => {
  try {
    // Match Cloudinary URL pattern and extract public ID
    const match = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp)$/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

export default cloudinary;
