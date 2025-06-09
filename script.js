const categories = {
  love: {
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
  career: {
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
  destiny: {
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
  warning: {
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
      "Slow down.", "Don’t ignore the patterns.",
      "Protect your energy.", "Not everything is for you."
    ]
  }
};

let currentCategory = "destiny";

function getSmartPrediction() {
  const cat = categories[currentCategory];
  const r = arr => arr[Math.floor(Math.random() * arr.length)];
  return `${r(cat.starters)} ${r(cat.verbs)} ${r(cat.nouns)}. ${r(cat.closers)}`;
}

function predict() {
  const input = document.getElementById('userInput').value.trim();
  const box = document.getElementById('predictionBox');

  if (input === '') {
    box.innerHTML = "🔁 Ask a real question, seeker of fate.";
    return;
  }

  box.innerHTML = `<em>✨ DreamWeaver is thinking...</em>`;

  setTimeout(() => {
    const response = getSmartPrediction();
    typeText(response, box);
  }, 1000);
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
  if (categories[cat]) {
    currentCategory = cat;
    document.getElementById("predictionBox").innerHTML = `🔮 Category set to <strong>${cat}</strong>. Ask again.`;
  }
}
