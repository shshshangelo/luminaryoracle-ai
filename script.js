// script.js - Gemini API integration (categories removed)

// Start with no selected category
let currentCategory = "";

// API configuration
const API_BASE_URL = window.location.origin; // Use same origin for API calls

async function predict() {
  const input = document.getElementById('userInput').value.trim();
  const box = document.getElementById('predictionBox');

  if (input === '') {
    box.innerHTML = "🔁 Ask a real question, seeker of fate.";
    return;
  }
  if (!currentCategory) {
    box.innerHTML = "⚠️ Please select a category first!";
    return;
  }

  box.innerHTML = `<em>✨ DreamWeaver is thinking...</em>`;

  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: input,
        category: currentCategory,
        useGemini: true // Set to false to use template system only
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      box.innerHTML = `⚠️ ${data.error}`;
      return;
    }

    // Type out the prediction
    typeText(data.prediction, box);

  } catch (error) {
    console.error('API Error:', error);
    box.innerHTML = "🔮 The mystical forces are disturbed. Please try again.";
  }
}

function typeText(text, element) {
  element.innerHTML = '';
  let i = 0;
  const speed = 80; // typing speed
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggleBtn');
  const isDark = body.classList.contains('dark-mode');
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  if (isDark) {
    btn.classList.remove('btn-outline-light');
    btn.classList.add('btn-outline-dark');
  } else {
    btn.classList.remove('btn-outline-dark');
    btn.classList.add('btn-outline-light');
  }
}

function setCategory(cat) {
  // Remove highlight from all category buttons
  document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active'));
  // Highlight the selected button
  const idx = ["Love", "Career", "Destiny", "Warning"].indexOf(cat);
  if (idx !== -1) {
    document.querySelectorAll('.btn-group .btn')[idx].classList.add('active');
  }

  const validCategories = ["Love", "Career", "Destiny", "Warning"];
  if (validCategories.includes(cat)) {
    currentCategory = cat;
    document.getElementById("predictionBox").innerHTML = `🔮 Category set to <strong>${cat}</strong>.`;
  } else {
    currentCategory = "";
    document.getElementById("predictionBox").innerHTML = "⚠️ No category selected.";
  }
}

// Check API health on page load
async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (response.ok) {
      console.log('✨ DreamWeaver AI API is connected');
    } else {
      console.warn('⚠️ API health check failed');
    }
  } catch (error) {
    console.warn('⚠️ Could not connect to API:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAPIHealth();
});
