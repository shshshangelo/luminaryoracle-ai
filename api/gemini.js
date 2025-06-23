const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateGeminiPrediction(question, category) {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    const prompt = `You are Luminary Oracle, a mystical seer. The user asked: "${question}" in the ${category} category.\n\nGive a direct, mystical prediction that specifically addresses their question. Keep it:\n- 2-3 sentences maximum\n- Mystical and poetic but relevant to their question\n- Focused on the ${category} theme\n- Personal and specific to what they asked\n\nDon't give generic advice - make it feel like you're reading their specific situation.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw error;
  }
}

module.exports = { generateGeminiPrediction }; 