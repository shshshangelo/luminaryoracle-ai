# 🔮 Luminary Oracle

A mystical AI oracle that illuminates your path with wisdom from the stars, powered by Google's Gemini AI. Built with Node.js, Express, and a beautiful frontend interface.

🪄 Live Site: [https://dreamweaver-ai-khaki.vercel.app/](https://dreamweaver-ai-khaki.vercel.app/)

---

## ✨ Features

- **Mystical Predictions**: Get poetic, mysterious insights for Love, Career, Destiny, and Warnings
- **Gemini AI Integration**: Powered by Google's Gemini AI for intelligent, contextual responses
- **Beautiful UI**: Dark/light theme toggle with animated stars background
- **Category Selection**: Choose from Love ❤️, Career 💼, Destiny 🔮, or Warning ⚠️
- **Typewriter Effect**: Predictions appear with a mystical typing animation

---

## 📸 Screenshot

![DreamWeaver AI Screenshot](assets/images/screenshot.png)

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Google Gemini API key

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd luminary-oracle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your Gemini API key**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Copy `env.example` to `.env`
   - Add your API key to the `.env` file:
   ```bash
   cp env.example .env
   ```
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Visit `http://localhost:3000`
   - Start asking the oracle your questions! 🔮

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

### API Endpoints

- `GET /` - Main application interface
- `GET /api/health` - API health check
- `POST /api/predict` - Get a prediction
- `GET /api/categories` - List available categories

### Prediction API Usage

```javascript
// Example API call
const response = await fetch('/api/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: "Will I find love this year?",
    category: "Love"
  })
});

const data = await response.json();
console.log(data.prediction);
```

## 🔧 Configuration

### Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required for AI predictions)
- `PORT` - Server port (default: 3000)

## 🌟 How It Works

1. **User Input**: User asks a question and selects a category
2. **API Processing**: Request sent to Express backend
3. **Gemini AI**: Question processed by Google's Gemini AI with mystical prompts
4. **Response**: Mystical prediction returned with typewriter effect

## 🎨 Customization

### Styling
- Modify `style.css` for visual changes
- The app supports dark/light theme toggle
- Stars background animation can be customized

### Prediction Style
- Edit the Gemini prompt in `server.js` to change the AI's personality
- The oracle maintains a mystical, seer-like persona

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup
Make sure to set your `GEMINI_API_KEY` in production environment variables.

## 📝 License

MIT License - feel free to use this project for your own mystical AI applications!

## 🙏 Acknowledgments

- Built with ❤️ by **Michael Entera**
- Powered by Google Gemini AI
- Inspired by mystical oracles and cosmic wisdom

---

**🔮 May the stars guide your path! ✨**

---
