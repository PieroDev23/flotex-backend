// Simple test script to verify the products search functionality
const http = require('http');

const baseUrl = 'http://localhost:5000/live/products';

// Test cases
const testCases = [
  {
    name: 'Test 1: Get all products (no filters)',
    url: `${baseUrl}/list`,
    description: 'Should return all products'
  },
  {
    name: 'Test 2: Search by product name',
    url: `${baseUrl}/list?search=Denim`,
    description: 'Should return products with "Denim" in name'
  },
  {
    name: 'Test 3: Search by SKU',
    url: `${baseUrl}/list?search=DEN-STR`,
    description: 'Should return products with "DEN-STR" in SKU'
  },
  {
    name: 'Test 4: Search by partial name',
    url: `${baseUrl}/list?search=Lycra`,
    description: 'Should return products with "Lycra" in name'
  },
  {
    name: 'Test 5: Search by partial SKU',
    url: `${baseUrl}/list?search=SPO`,
    description: 'Should return products with "SPO" in SKU'
  },
  {
    name: 'Test 6: Backward compatibility - name filter',
    url: `${baseUrl}/list?name=Denim`,
    description: 'Should still work with old name filter'
  },
  {
    name: 'Test 7: Backward compatibility - sku filter',
    url: `${baseUrl}/list?sku=DEN-STR-BLCL`,
    description: 'Should still work with old sku filter'
  }
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runTests() {
  console.log('🧪 Testing Products Search API\n');
  
  for (const testCase of testCases) {
    try {
      console.log(`\n${testCase.name}`);
      console.log(`📝 ${testCase.description}`);
      console.log(`🔗 ${testCase.url}`);
      
      const result = await makeRequest(testCase.url);
      
      if (result.status === 200) {
        const products = result.data;
        console.log(`✅ Success! Found ${products.length} products`);
        
        // Show first few products for verification
        if (products.length > 0) {
          console.log('📦 Sample results:');
          products.slice(0, 3).forEach((product, index) => {
            console.log(`   ${index + 1}. ${product.name} (SKU: ${product.sku})`);
          });
          if (products.length > 3) {
            console.log(`   ... and ${products.length - 3} more`);
          }
        }
      } else {
        console.log(`❌ Failed with status ${result.status}`);
        console.log(`Response: ${JSON.stringify(result.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    console.log('─'.repeat(60));
  }
}

// Check if server is running first
console.log('🔍 Checking if server is running...');
makeRequest('http://localhost:5000/live/health')
  .then((result) => {
    if (result.status === 200) {
      console.log('✅ Server is running!');
      runTests();
    } else {
      console.log('❌ Server health check failed. Make sure the server is running with: npm run dev');
    }
  })
  .catch((error) => {
    console.log('❌ Cannot connect to server. Make sure it\'s running on port 5000 with: npm run dev');
    console.log(`Error: ${error.message}`);
  });
