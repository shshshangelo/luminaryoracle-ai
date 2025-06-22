// Simple test script for DreamWeaver AI API
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000';

async function testAPI() {
  console.log('🔮 Testing DreamWeaver AI API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);

    // Test categories endpoint
    console.log('\n2. Testing categories endpoint...');
    const categoriesResponse = await fetch(`${API_BASE}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    console.log('✅ Categories:', categoriesData.categories);

    // Test prediction endpoint (template mode)
    console.log('\n3. Testing prediction endpoint (template mode)...');
    const predictionResponse = await fetch(`${API_BASE}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: "Will I find success in my career?",
        category: "Career",
        useGemini: false // Use template system
      })
    });
    const predictionData = await predictionResponse.json();
    console.log('✅ Template prediction:', predictionData.prediction);

    console.log('\n🎉 All tests passed! The API is working correctly.');
    console.log('\nTo test with Gemini AI:');
    console.log('1. Set your GEMINI_API_KEY in .env file');
    console.log('2. Change useGemini to true in the test above');
    console.log('3. Run the test again');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure the server is running with: npm start');
  }
}

testAPI(); 