const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate prediction using Gemini AI
async function generateGeminiPrediction(question, category) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are Luminary Oracle, a mystical seer. The user asked: "${question}" in the ${category} category.

Give a direct, mystical prediction that specifically addresses their question. Keep it:
- 2-3 sentences maximum
- Mystical and poetic but relevant to their question
- Focused on the ${category} theme
- Personal and specific to what they asked

Don't give generic advice - make it feel like you're reading their specific situation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return null;
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Luminary Oracle is alive and mystical ✨' });
});

app.post('/api/predict', async (req, res) => {
  try {
    const { question, category } = req.body;
    
    if (!question || !question.trim()) {
      return res.status(400).json({ 
        error: 'Please provide a question for the oracle' 
      });
    }
    
    const validCategories = ["Love", "Career", "Destiny", "Warning"];
    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({ 
        error: 'Please select a valid category: Love, Career, Destiny, or Warning' 
      });
    }

    const prediction = await generateGeminiPrediction(question, category);
    
    if (!prediction) {
      return res.status(500).json({ 
        error: 'The oracle is silent today. Please try again.' 
      });
    }

    res.json({
      prediction,
      category,
      question,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Prediction Error:', error);
    res.status(500).json({ 
      error: 'The mystical forces are disturbed. Please try again.' 
    });
  }
});

app.get('/api/categories', (req, res) => {
  res.json({
    categories: ["Love", "Career", "Destiny", "Warning"],
    description: 'Available mystical categories for Luminary Oracle'
  });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`🔮 Luminary Oracle is running on port ${PORT}`);
  console.log(`✨ Visit http://localhost:${PORT} to access the oracle`);
  
  if (!process.env.GEMINI_API_KEY) {
    console.log('⚠️  GEMINI_API_KEY not found. Please set your API key.');
  } else {
    console.log('✨ Gemini AI integration is active');
  }
}); 