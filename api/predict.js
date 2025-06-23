const { generateGeminiPrediction } = require('./gemini');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { question, category } = req.body;

  if (!question || !question.trim()) {
    res.status(400).json({ error: 'Please provide a question for the oracle' });
    return;
  }

  const validCategories = ["Love", "Career", "Destiny", "Warning"];
  if (!category || !validCategories.includes(category)) {
    res.status(400).json({ error: 'Please select a valid category: Love, Career, Destiny, or Warning' });
    return;
  }

  try {
    const prediction = await generateGeminiPrediction(question, category);
    res.json({
      prediction,
      category,
      question,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Prediction Error:', error);
    res.status(500).json({ error: 'The mystical forces are disturbed. Please try again.' });
  }
}; 