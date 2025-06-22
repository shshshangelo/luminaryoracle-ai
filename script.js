// script.js - Gemini API integration (categories removed)

// Start with no selected category
let currentCategory = "";

// API configuration
const API_BASE_URL = window.location.origin; // Use same origin for API calls

                                    // Function to disable UI elements during AI processing
function disableUI() {
  // Disable category buttons
  document.querySelectorAll('.btn-group .btn').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.5';                                                                                  
    btn.style.cursor = 'not-allowed';
  });
  
  // Disable input field
  const input = document.getElementById('userInput');
  input.disabled = true;
  input.style.opacity = '0.5';
  input.style.cursor = 'not-allowed';
  
  // Disable predict button
  const predictBtn = document.querySelector('button[onclick="predict()"]');
  if (predictBtn) {
    predictBtn.disabled = true;
    predictBtn.style.opacity = '0.5';
    predictBtn.style.cursor = 'not-allowed';
  }
}

// Function to enable UI elements after AI processing
function enableUI() {
  // Enable category buttons
  document.querySelectorAll('.btn-group .btn').forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
  });
  
  // Enable input field
  const input = document.getElementById('userInput');
  input.disabled = false;
  input.style.opacity = '1';
  input.style.cursor = 'text';
  
  // Enable predict button
  const predictBtn = document.querySelector('button[onclick="predict()"]');
  if (predictBtn) {
    predictBtn.disabled = false;
    predictBtn.style.opacity = '1';
    predictBtn.style.cursor = 'pointer';
  }
}

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

  // Show the prediction box again for new predictions
  box.style.display = 'block';
  
  // Disable UI while AI is thinking
  disableUI();
  box.innerHTML = `<em>✨ Luminary Oracle is thinking...</em>`;

  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: input,
        category: currentCategory
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      box.innerHTML = `⚠️ ${data.error}`;
      enableUI(); // Re-enable UI on error
      return;
    }

    // Show the result section and type the prediction
    showResult(data.question, data.category, data.prediction, data.timestamp);

  } catch (error) {
    console.error('API Error:', error);
    box.innerHTML = "🔮 The mystical forces are disturbed. Please try again.";
    enableUI(); // Re-enable UI on error
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
      enableUI(); // Re-enable UI when typing is complete
    }
  }, speed);
}

function showResult(question, category, prediction, timestamp) {
  // Get category emoji
  const categoryEmojis = {
    'Love': '❤️',
    'Career': '💼', 
    'Destiny': '🔮',
    'Warning': '⚠️'
  };
  
  // Update result section elements
  document.getElementById('resultCategory').textContent = categoryEmojis[category] || '🔮';
  document.getElementById('resultQuestion').textContent = question;
  
  // Show the result section
  document.getElementById('resultSection').style.display = 'block';
  
  // Hide the prediction box to remove empty space
  document.getElementById('predictionBox').style.display = 'none';
  
  // Type the prediction in the result card
  typeTextInResult(prediction);
  
  // Scroll to result section
  document.getElementById('resultSection').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
}

function typeTextInResult(text) {
  const resultElement = document.getElementById('resultPrediction');
  resultElement.innerHTML = '';
  let i = 0;
  const speed = 80; // typing speed
  const interval = setInterval(() => {
    resultElement.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      enableUI(); // Re-enable UI when typing is complete
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
  // Check if UI is disabled (AI is thinking)
  const categoryButtons = document.querySelectorAll('.btn-group .btn');
  if (categoryButtons[0] && categoryButtons[0].disabled) {
    return; // Don't allow category changes while AI is thinking
  }
  
  // Remove highlight from all category buttons
  categoryButtons.forEach(btn => btn.classList.remove('active'));
  // Highlight the selected button
  const idx = ["Love", "Career", "Destiny", "Warning"].indexOf(cat);
  if (idx !== -1) {
    categoryButtons[idx].classList.add('active');
  }

  const validCategories = ["Love", "Career", "Destiny", "Warning"];
  if (validCategories.includes(cat)) {
    currentCategory = cat;
    document.getElementById("predictionBox").innerHTML = `🔮 Category set to <strong>${cat}</strong>.`;
    
    // Hide the result section when category changes
    document.getElementById("resultSection").style.display = 'none';
    // Show the prediction box again
    document.getElementById("predictionBox").style.display = 'block';
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
