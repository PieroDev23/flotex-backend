# Product API Documentation

## Overview
The Product API now supports image upload using multipart/form-data with Cloudinary integration. Images are automatically optimized and converted to WebP format for better performance.

## Endpoints

### 1. Create Product
**POST** `/live/products/`

**Content-Type:** `multipart/form-data`

**Authentication:** Required (Admin role)

**Form Fields:**
- `name` (string, required): Product name
- `description` (string, required): Product description
- `price` (number, required): Price in cents (e.g., 1500 for $15.00)
- `sku` (string, required): Product SKU
- `stock` (number, required): Stock quantity
- `categoryId` (string, required): Category ID
- `discount` (number, optional): Discount percentage (0-100)
- `image` (file, required): Product image (JPG, PNG, GIF, WebP, max 5MB)

**Response (201):**
```json
{
  "code": "ProductCreated",
  "message": "Product created successfully",
  "product": {
    "id": 1,
    "name": "Denim Premium Blue",
    "description": "High quality denim fabric",
    "price": 1500,
    "sku": "DEN-PREM-BLU",
    "stock": 100,
    "categoryId": "denim",
    "discount": null,
    "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/flotex/products/product_DEN-PREM-BLU_1234567890.webp",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "imageInfo": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/flotex/products/product_DEN-PREM-BLU_1234567890.webp",
    "publicId": "flotex/products/product_DEN-PREM-BLU_1234567890",
    "format": "webp",
    "size": 245760
  }
}
```

### 2. Update Product
**PUT** `/live/products/`

**Content-Type:** `multipart/form-data` OR `application/json`

**Authentication:** Required (Admin role)

**For multipart/form-data (with optional image):**
- `productId` (number, required): Product ID to update
- `name` (string, optional): New product name
- `description` (string, optional): New description
- `price` (number, optional): New price in cents
- `sku` (string, optional): New SKU
- `stock` (number, optional): New stock quantity
- `categoryId` (string, optional): New category ID
- `discount` (number, optional): New discount percentage
- `image` (file, optional): New product image

**For JSON (legacy):**
```json
{
  "productId": 1,
  "fields": {
    "name": "Updated Product Name",
    "price": 2000,
    "stock": 150
  }
}
```

### 3. List Products with Search
**GET** `/live/products/list`

**Query Parameters:**
- `search` (string, optional): Search in product name or SKU
- `name` (string, optional): Filter by product name
- `sku` (string, optional): Filter by SKU
- `categoryId` (string, optional): Filter by category
- `priceSort` (string, optional): Sort by price ("asc" or "desc")

### 4. Get Product by ID
**GET** `/live/products/:id`

### 5. Delete Product
**DELETE** `/live/products/:id`

**Authentication:** Required (Admin role)

## Environment Variables

Add these to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Image Upload Features

- **Automatic Optimization:** Images are automatically optimized for web
- **Format Conversion:** Images are converted to WebP for better compression
- **Size Limit:** Maximum file size is 5MB
- **Supported Formats:** JPG, PNG, GIF, WebP
- **Folder Organization:** Images are stored in `flotex/products/` folder
- **Unique Naming:** Files are named with SKU and timestamp for uniqueness

## Error Responses

### 400 - Bad Request
```json
{
  "code": "ImageRequired",
  "message": "Product image is required"
}
```

### 403 - Validation Error
```json
{
  "code": "InvalidBody",
  "message": "The given request body is not valid.",
  "data": {
    "issues": [...]
  }
}
```

### 500 - Server Error
```json
{
  "code": "ProductCreationFailed",
  "message": "Failed to create product",
  "error": "Error details"
}
```

## Testing

Use the provided `test-product-upload.html` file to test the image upload functionality in your browser. Make sure to:

1. Start the server: `npm run dev`
2. Configure Cloudinary credentials in `.env`
3. Open `test-product-upload.html` in your browser
4. Fill out the form and upload an image

## Migration Notes

- POST `/products/` endpoint only accepts multipart/form-data with required image
- PUT `/products/` endpoint handles both multipart/form-data and JSON automatically
- For updates, images are optional in multipart requests
- JSON requests for updates work as before for backward compatibility
- Existing products with image URLs will continue to work
- The search functionality is now available with the `search` parameter
