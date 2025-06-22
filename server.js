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

// Categories configuration (moved from frontend)
const categories = {
  Love: {
    starters: [
      "The stars whisper of love:", "A heart beats in the shadows:",
      "The universe stirs your emotions:", "In matters of the heart:"
    ],
    verbs: [
      "you will reconnect with", "you may lose", "you must trust",
      "you are being drawn to", "you will heal through"
    ],
    nouns: [
      "a quiet love", "an old flame", "a soulmate", "a tender goodbye",
      "an unexpected affection", "emotional growth"
    ],
    closers: [
      "Open your heart.", "This was meant to happen.",
      "Do not chase—allow.", "Love finds those who wait."
    ]
  },
  Career: {
    starters: [
      "The stars point to your ambition:", "DreamWeaver sees your purpose:",
      "Opportunity knocks quietly:", "In your path of work:"
    ],
    verbs: [
      "you will earn", "you must question", "you are close to",
      "you will overcome", "you should follow"
    ],
    nouns: [
      "a new offer", "financial clarity", "your next breakthrough",
      "a decision of value", "a test of patience"
    ],
    closers: [
      "Let your work speak.", "Delay is not denial.",
      "Growth is uncomfortable—keep going.", "You are ready for this."
    ]
  },
  Destiny: {
    starters: [
      "The fabric of fate shifts:", "A pattern emerges:",
      "You are aligned with a greater story:", "In the threads of time:"
    ],
    verbs: [
      "you will realize", "you are pulled toward", "you must accept",
      "you will shed", "you will awaken to"
    ],
    nouns: [
      "your next chapter", "a higher calling", "something ancient within you",
      "your deepest truth", "a mirror moment"
    ],
    closers: [
      "This is your time.", "The shift begins with you.",
      "You were never lost.", "Let go. Flow forward."
    ]
  },
  Warning: {
    starters: [
      "A shadow passes over:", "The energy dims:",
      "Caution hums through the air:", "A quiet storm brews:"
    ],
    verbs: [
      "you must be careful of", "you should stay away from",
      "you will be tested by", "you may lose yourself in", "you are ignoring"
    ],
    nouns: [
      "a false light", "a tempting path", "someone untrue",
      "emotional fog", "a repeating cycle"
    ],
    closers: [
      "Slow down.", "Don't ignore the patterns.",
      "Protect your energy.", "Not everything is for you."
    ]
  }
};

// Helper function to get random element from array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate prediction using template system
function generateTemplatePrediction(category) {
  if (!categories[category]) {
    return null;
  }
  
  const cat = categories[category];
  return `${getRandomElement(cat.starters)} ${getRandomElement(cat.verbs)} ${getRandomElement(cat.nouns)}. ${getRandomElement(cat.closers)}`;
}

// Generate prediction using Gemini AI
async function generateGeminiPrediction(question, category) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are DreamWeaver AI, a mystical oracle that provides poetic, mysterious, and insightful predictions. 

The user is asking about: "${question}"
Category: ${category}

Please provide a mystical, poetic prediction that:
1. Is mysterious and mystical in tone
2. Relates to the ${category} category
3. Is inspired by the user's question
4. Uses poetic language with metaphors and cosmic imagery
5. Is between 2-4 sentences long
6. Ends with a profound, mystical closing statement
7. Maintains the mystical oracle persona

Format your response as a single, flowing prediction without breaking it into parts.`;

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
  res.json({ status: 'DreamWeaver AI is alive and mystical ✨' });
});

app.post('/api/predict', async (req, res) => {
  try {
    const { question, category, useGemini = true } = req.body;
    
    if (!question || !question.trim()) {
      return res.status(400).json({ 
        error: 'Please provide a question for the oracle' 
      });
    }
    
    if (!category || !categories[category]) {
      return res.status(400).json({ 
        error: 'Please select a valid category: Love, Career, Destiny, or Warning' 
      });
    }

    let prediction;
    
    if (useGemini && process.env.GEMINI_API_KEY) {
      // Try Gemini first, fallback to template if it fails
      prediction = await generateGeminiPrediction(question, category);
      if (!prediction) {
        prediction = generateTemplatePrediction(category);
      }
    } else {
      // Use template system
      prediction = generateTemplatePrediction(category);
    }

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
    categories: Object.keys(categories),
    description: 'Available mystical categories for DreamWeaver AI'
  });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`🔮 DreamWeaver AI API is running on port ${PORT}`);
  console.log(`✨ Visit http://localhost:${PORT} to access the oracle`);
  
  if (!process.env.GEMINI_API_KEY) {
    console.log('⚠️  GEMINI_API_KEY not found. Using template predictions only.');
  } else {
    console.log('✨ Gemini AI integration is active');
  }
}); 