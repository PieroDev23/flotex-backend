#!/bin/bash

# Product API Test Examples with cURL
# Make sure to replace the session cookie with a valid admin session

BASE_URL="http://localhost:5000/live"
COOKIE="session=your_admin_session_token_here"

echo "🧪 Product API Test Examples"
echo "================================"

echo ""
echo "1. 📋 List all products"
curl -X GET "$BASE_URL/products/list" \
  -H "Cookie: $COOKIE" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "2. 🔍 Search products by name"
curl -X GET "$BASE_URL/products/list?search=Denim" \
  -H "Cookie: $COOKIE" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "3. 🔍 Search products by SKU"
curl -X GET "$BASE_URL/products/list?search=DEN-STR" \
  -H "Cookie: $COOKIE" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "4. 📦 Create product with image upload"
echo "Note: Replace 'path/to/image.jpg' with actual image path"
curl -X POST "$BASE_URL/products/" \
  -H "Cookie: $COOKIE" \
  -F "name=Test Product with Image" \
  -F "description=This is a test product created with image upload" \
  -F "price=2500" \
  -F "sku=TEST-IMG-001" \
  -F "stock=50" \
  -F "categoryId=denim" \
  -F "discount=15" \
  -F "image=@path/to/image.jpg" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "5. ✏️ Update product with new image (multipart)"
echo "Note: Replace 'path/to/new-image.jpg' with actual image path and productId"
curl -X PUT "$BASE_URL/products/" \
  -H "Cookie: $COOKIE" \
  -F "productId=1" \
  -F "name=Updated Product Name" \
  -F "price=3000" \
  -F "image=@path/to/new-image.jpg" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "6. ✏️ Update product with JSON (legacy)"
curl -X PUT "$BASE_URL/products/" \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "fields": {
      "name": "Updated Product Name JSON",
      "price": 2200,
      "stock": 80
    }
  }' \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "7. 👁️ Get specific product"
curl -X GET "$BASE_URL/products/1" \
  -H "Cookie: $COOKIE" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "8. 🗑️ Delete product"
echo "Note: Uncomment the line below to actually delete a product"
# curl -X DELETE "$BASE_URL/products/1" \
#   -H "Cookie: $COOKIE" \
#   -w "\nStatus: %{http_code}\n\n"

echo ""
echo "✅ Test examples completed!"
echo ""
echo "📝 Notes:"
echo "- Replace 'your_admin_session_token_here' with a valid admin session token"
echo "- Replace image paths with actual image files"
echo "- Replace productId values with actual product IDs"
echo "- Make sure the server is running on localhost:5000"
echo "- Make sure Cloudinary is configured in .env file"
