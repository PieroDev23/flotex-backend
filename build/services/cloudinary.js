"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPublicId = exports.deleteImage = exports.uploadImage = void 0;
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Upload an image to Cloudinary
 * @param buffer - Image buffer
 * @param folder - Cloudinary folder (optional)
 * @param publicId - Custom public ID (optional)
 * @returns Promise with upload result
 */
const uploadImage = async (buffer, folder = 'flotex/products', publicId) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder,
            resource_type: 'image',
            format: 'webp', // Convert to WebP for better compression
            quality: 'auto:good', // Automatic quality optimization
            fetch_format: 'auto', // Automatic format selection
        };
        if (publicId) {
            uploadOptions.public_id = publicId;
        }
        cloudinary_1.v2.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) {
                reject(error);
            }
            else if (result) {
                resolve({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                    url: result.url,
                    format: result.format,
                    width: result.width,
                    height: result.height,
                    bytes: result.bytes,
                });
            }
            else {
                reject(new Error('Upload failed: No result returned'));
            }
        }).end(buffer);
    });
};
exports.uploadImage = uploadImage;
/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Promise with deletion result
 */
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary_1.v2.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        throw new Error(`Failed to delete image: ${error}`);
    }
};
exports.deleteImage = deleteImage;
/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if not a valid Cloudinary URL
 */
const extractPublicId = (url) => {
    try {
        // Match Cloudinary URL pattern and extract public ID
        const match = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp)$/i);
        return match ? match[1] : null;
    }
    catch {
        return null;
    }
};
exports.extractPublicId = extractPublicId;
exports.default = cloudinary_1.v2;
