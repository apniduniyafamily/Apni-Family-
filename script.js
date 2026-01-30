// Toast Notification System
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  };
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
    </div>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if(toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 400);
  }, 4000);
}

// Menu Functions
function openMenu(){
  const overlay = document.getElementById('overlay');
  overlay.classList.add("active");
}

function closeMenu(){
  const overlay = document.getElementById('overlay');
  overlay.classList.remove("active");
}

// Settings Functions
function openSettings(){
  closeMenu();
  document.getElementById("settingsOverlay").classList.add("active");
}

function closeSettings(){
  document.getElementById("settingsOverlay").classList.remove("active");
  // Hide all sections
  document.getElementById("customColors").classList.remove("active");
  document.getElementById("fontColors").classList.remove("active");
  document.getElementById("fontStyles").classList.remove("active");
}

// Navigation with loader
function go(page){
  closeMenu();
  closeSettings();
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
  setTimeout(() => {
    window.location.href = page;
  }, 1200);
}

// Color Picker Functions
function showColorTab(tab) {
  const tabs = document.querySelectorAll('.color-tab');
  tabs.forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  
  if(tab === 'spectrum') {
    document.getElementById('spectrumTab').style.display = 'block';
    document.getElementById('swatchesTab').style.display = 'none';
  } else {
    document.getElementById('spectrumTab').style.display = 'none';
    document.getElementById('swatchesTab').style.display = 'block';
  }
}

function updateColorFromSliders() {
  const red = document.getElementById('redSlider')?.value || 233;
  const green = document.getElementById('greenSlider')?.value || 233;
  const blue = document.getElementById('blueSlider')?.value || 233;
  
  document.getElementById('redValue').textContent = red;
  document.getElementById('greenValue').textContent = green;
  document.getElementById('blueValue').textContent = blue;
  
  const hex = rgbToHex(parseInt(red), parseInt(green), parseInt(blue));
  document.getElementById('hexValue').textContent = hex;
  document.getElementById('colorPreviewBox').style.background = hex;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function selectSwatchColor(color) {
  const hex = color;
  const rgb = hexToRgb(color);
  
  document.getElementById('redSlider').value = rgb.r;
  document.getElementById('greenSlider').value = rgb.g;
  document.getElementById('blueSlider').value = rgb.b;
  
  updateColorFromSliders();
}

function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

// Theme Functions
function changeTheme(theme){
  // Hide custom colors if showing
  document.getElementById('customColors').classList.remove('active');
  
  // Remove existing theme classes
  document.body.classList.remove('dark-theme');
  
  // Reset to original colors if theme is original
  if(theme === 'original') {
    document.documentElement.style.setProperty('--primary', '#1d4ed8');
    document.documentElement.style.setProperty('--accent', '#38bdf8');
    document.documentElement.style.setProperty('--bg', '#f1f5f9');
    document.documentElement.style.setProperty('--card', '#ffffff');
    document.documentElement.style.setProperty('--text', '#334155');
    document.documentElement.style.setProperty('--dark', '#0b1220');
  }
  
  if(theme === 'dark'){
    document.body.classList.add('dark-theme');
  }
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Store preference
  localStorage.setItem('theme', theme);
  localStorage.removeItem('customColor');
}

function toggleCustomColors(){
  const customColors = document.getElementById('customColors');
  const isActive = customColors.classList.contains('active');
  
  // Hide other sections
  document.getElementById('fontColors').classList.remove('active');
  document.getElementById('fontStyles').classList.remove('active');
  
  if(!isActive){
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    customColors.classList.add('active');
  } else {
    customColors.classList.remove('active');
  }
}

function applyCustomColor(){
  const hexValue = document.getElementById('hexValue');
  if(!hexValue) return;
  
  const hex = hexValue.textContent;
  
  // Apply custom color to primary variable
  document.documentElement.style.setProperty('--primary', hex);
  
  // Store in localStorage
  localStorage.setItem('customColor', hex);
  localStorage.setItem('theme', 'custom');
  
  showToast('रंग बदल गया', 'कस्टम रंग लागू किया गया', 'success');
  closeSettings();
}

// Font Colors Functions
function toggleFontColors(){
  const fontColors = document.getElementById('fontColors');
  const isActive = fontColors.classList.contains('active');
  
  // Hide other sections
  document.getElementById('customColors').classList.remove('active');
  document.getElementById('fontStyles').classList.remove('active');
  
  if(!isActive){
    fontColors.classList.add('active');
  } else {
    fontColors.classList.remove('active');
  }
}

function changeFontColor(color){
  // Update active color
  document.querySelectorAll('.font-colors-container .color-option').forEach(opt => {
    opt.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Apply font color
  document.documentElement.style.setProperty('--font-color', color);
  document.documentElement.style.setProperty('--text', color);
  document.documentElement.style.setProperty('--dark', color);
  
  // Store in localStorage
  localStorage.setItem('fontColor', color);
}

// Font Styles Functions
function toggleFontStyles(){
  const fontStyles = document.getElementById('fontStyles');
  const isActive = fontStyles.classList.contains('active');
  
  // Hide other sections
  document.getElementById('customColors').classList.remove('active');
  document.getElementById('fontColors').classList.remove('active');
  
  if(!isActive){
    fontStyles.classList.add('active');
  } else {
    fontStyles.classList.remove('active');
  }
}

function changeFontStyle(font){
  // Update active font
  document.querySelectorAll('.font-item').forEach(item => {
    item.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Remove all font classes
  const fontClasses = ['font-mukta','font-noto','font-poppins','font-inter',
                      'font-montserrat','font-raleway','font-opensans',
                      'font-roboto','font-playfair','font-lora','font-merriweather'];
  fontClasses.forEach(fc => document.body.classList.remove(fc));
  
  // Add selected font
  document.body.classList.add(`font-${font}`);
  
  // Store in localStorage
  localStorage.setItem('font', font);
}

// ===== SEARCH FUNCTIONALITY =====

// Toggle Search Bar
function toggleSearch() {
  const searchContainer = document.getElementById('searchContainer');
  const isActive = searchContainer.classList.contains('active');
  
  if (!isActive) {
    searchContainer.classList.add('active');
    document.getElementById('searchInput').focus();
  } else {
    closeSearch();
  }
}

function closeSearch() {
  const searchContainer = document.getElementById('searchContainer');
  if (searchContainer) {
    searchContainer.classList.remove('active');
  }
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  hideSearchResults();
  closeVirtualKeyboard();
}

// Search content data
const searchContent = [
  {
    id: 'heroTitle',
    title: 'Apni Duniya',
    content: 'सबकी अपनी सोच, सब एक',
    page: 'index.html'
  },
  {
    id: 'heroDesc',
    title: 'विचार मंच',
    content: 'एक ऐसा मंच जहाँ सोच अलग हो सकती है, सम्मान नहीं।',
    page: 'index.html'
  },
  {
    id: 'featuresTitle',
    title: 'हमारी विशेषताएँ',
    content: 'Apni Duniya को मजबूत बनाने वाले स्तंभ',
    page: 'index.html'
  },
  {
    id: 'card1Title',
    title: 'अपनी सोच',
    content: 'हर विचार का सम्मान',
    page: 'soch.html'
  },
  {
    id: 'card2Title',
    title: 'समुदाय',
    content: 'सबको जोड़ने का मंच',
    page: 'community.html'
  },
  {
    id: 'card3Title',
    title: 'हमारा मिशन',
    content: 'सकारात्मक बदलाव',
    page: 'mission.html'
  },
  {
    id: 'card4Title',
    title: 'हमारी दृष्टि',
    content: 'एक मजबूत समाज',
    page: 'vision.html'
  },
  {
    id: 'card5Title',
    title: 'पारदर्शिता',
    content: 'खुला और साफ़ सिस्टम',
    page: 'transparency.html'
  },
  {
    id: 'card6Title',
    title: 'सहायता',
    content: 'हर सदस्य के साथ',
    page: 'support.html'
  },
  {
    id: 'footerText',
    title: '© 2026 अपनी दुनिया',
    content: 'सबकी अपनी सोच',
    page: 'index.html'
  }
];

// Perform search
function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  
  if (!searchTerm.trim()) {
    hideSearchResults();
    return;
  }
  
  // Filter results
  const filteredResults = searchContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm) || 
    item.content.toLowerCase().includes(searchTerm) ||
    searchTerm.includes(item.title.toLowerCase()) ||
    searchTerm.includes(item.content.toLowerCase())
  );
  
  if (filteredResults.length > 0) {
    displaySearchResults(filteredResults, searchTerm);
  } else {
    resultsContainer.innerHTML = `
      <div class="result-item">
        <h4>कोई परिणाम नहीं मिला</h4>
        <p>अपनी खोज बदलकर दोबारा प्रयास करें</p>
      </div>
    `;
    resultsContainer.classList.add('active');
  }
}

// Display search results
function displaySearchResults(results, searchTerm) {
  const resultsContainer = document.getElementById('searchResults');
  
  let resultsHTML = '';
  results.forEach(result => {
    const highlightedTitle = highlightText(result.title, searchTerm);
    const highlightedContent = highlightText(result.content, searchTerm);
    
    resultsHTML += `
      <div class="result-item" onclick="scrollToResult('${result.id}', '${result.page}')">
        <h4>${highlightedTitle}</h4>
        <p>${highlightedContent}</p>
      </div>
    `;
  });
  
  resultsContainer.innerHTML = resultsHTML;
  resultsContainer.classList.add('active');
}

// Highlight matching text
function highlightText(text, searchTerm) {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="highlight-flash">$1</span>');
}

// Hide search results
function hideSearchResults() {
  const resultsContainer = document.getElementById('searchResults');
  if (resultsContainer) {
    resultsContainer.classList.remove('active');
  }
}

// Scroll to search result
function scrollToResult(elementId, page) {
  closeSearch();
  
  // If result is on another page, navigate there
  if (page !== 'index.html') {
    go(page);
    return;
  }
  
  // Scroll to element on current page
  const element = document.getElementById(elementId);
  if (element) {
    // Add highlight animation
    element.classList.add('highlight-flash');
    
    // Scroll to element
    const yOffset = -80; // Adjust for header height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    
    // Remove highlight after animation
    setTimeout(() => {
      element.classList.remove('highlight-flash');
    }, 2000);
  }
}

// ===== VOICE SEARCH =====
let recognition = null;
let isListening = false;

function initializeVoiceSearch() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'hi-IN'; // Hindi language
    
    recognition.onstart = function() {
      isListening = true;
      document.getElementById('voiceSearchBtn').classList.add('listening');
    };
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('searchInput').value = transcript;
      performSearch();
    };
    
    recognition.onerror = function(event) {
      console.error('Voice recognition error:', event.error);
    };
    
    recognition.onend = function() {
      isListening = false;
      document.getElementById('voiceSearchBtn').classList.remove('listening');
    };
  }
}

function toggleVoiceSearch() {
  if (!recognition) {
    initializeVoiceSearch();
  }
  
  if (isListening) {
    recognition.stop();
  } else {
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  }
}

// ===== VIRTUAL KEYBOARD FUNCTIONALITY =====

let currentKeyboardLayout = 'english';
let isShiftPressed = false;

// Virtual keyboard layouts
const keyboardLayouts = {
  english: {
    rows: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift']
    ],
    shiftRows: [
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift']
    ]
  },
  hindi: {
    rows: [
      ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', '=', 'backspace'],
      ['ो', 'े',  '्', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज', 'ड', '़', 'ॉ'],
      ['ो', 'े', '्', 'ी', 'ू', 'प', 'र', 'क', 'त', 'च', 'ट', 'enter'],
      ['य', 'श', 'ल', 'भ', 'न', 'म', 'व', 'स', ',', '.', 'shift']
    ],
    shiftRows: [
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace'],
      ['ौ', 'ै', 'ा', 'ॉ', 'ृ', 'ख', 'ध', 'घ', 'ठ', 'ढ', 'ञ', '़', '्'],
      ['औ', 'ऐ', 'आ', 'ऋ', 'ऊ', 'फ', 'ऱ', 'ख', 'थ', 'छ', 'ठ', 'enter'],
      ['ञ', 'ष', 'ळ', 'ढ', 'ण', 'ं', 'ऴ', 'श', ';', ':', 'shift']
    ]
  }
};

// Initialize virtual keyboard
function initializeVirtualKeyboard() {
  const keyboardBody = document.querySelector('.keyboard-body');
  if (!keyboardBody) return;
  
  generateKeyboardKeys();
}

// Generate keyboard keys
function generateKeyboardKeys() {
  const keyboardBody = document.querySelector('.keyboard-body');
  if (!keyboardBody) return;
  
  keyboardBody.innerHTML = '';
  
  const layout = isShiftPressed 
    ? keyboardLayouts[currentKeyboardLayout].shiftRows
    : keyboardLayouts[currentKeyboardLayout].rows;
  
  layout.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    
    row.forEach(key => {
      const keyDiv = document.createElement('div');
      keyDiv.className = 'keyboard-key';
      keyDiv.textContent = getKeyDisplay(key);
      
      // Add special classes
      if (key === 'backspace' || key === 'shift' || key === 'enter') {
        keyDiv.classList.add(key);
      }
      
      if (key === 'backspace' || key === 'enter') {
        keyDiv.classList.add('wide');
      }
      
      if (key === 'shift') {
        keyDiv.classList.add(isShiftPressed ? 'special' : '');
      }
      
      // Add click event
      keyDiv.addEventListener('click', () => handleKeyPress(key));
      
      rowDiv.appendChild(keyDiv);
    });
    
    keyboardBody.appendChild(rowDiv);
  });
}

// Get key display text
function getKeyDisplay(key) {
  const keyMap = {
    'backspace': '⌫',
    'shift': isShiftPressed ? '⇧' : '⇧',
    'enter': '⏎',
    'space': 'Space',
    ' ': 'Space'
  };
  
  return keyMap[key] || key;
}

// Handle key press
function handleKeyPress(key) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const currentValue = searchInput.value;
  const cursorPosition = searchInput.selectionStart;
  
  switch(key) {
    case 'backspace':
      if (cursorPosition > 0) {
        searchInput.value = currentValue.substring(0, cursorPosition - 1) + 
                           currentValue.substring(cursorPosition);
        searchInput.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }
      break;
      
    case 'enter':
      performSearch();
      closeVirtualKeyboard();
      break;
      
    case 'shift':
      isShiftPressed = !isShiftPressed;
      generateKeyboardKeys();
      break;
      
    case 'space':
      searchInput.value = currentValue.substring(0, cursorPosition) + ' ' + 
                         currentValue.substring(cursorPosition);
      searchInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      break;
      
    default:
      searchInput.value = currentValue.substring(0, cursorPosition) + key + 
                         currentValue.substring(cursorPosition);
      searchInput.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      break;
  }
  
  // Trigger input event for search
  searchInput.dispatchEvent(new Event('input', { bubbles: true }));
}

// Switch keyboard layout
function switchKeyboardLayout(layout) {
  currentKeyboardLayout = layout;
  isShiftPressed = false;
  
  // Update active language button
  document.querySelectorAll('.lang-key').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`.lang-key[onclick*="${layout}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  generateKeyboardKeys();
}

// Toggle virtual keyboard
function toggleVirtualKeyboard() {
  const keyboard = document.getElementById('virtualKeyboard');
  if (!keyboard) return;
  
  if (keyboard.classList.contains('active')) {
    closeVirtualKeyboard();
  } else {
    openVirtualKeyboard();
  }
}

function openVirtualKeyboard() {
  const keyboard = document.getElementById('virtualKeyboard');
  if (!keyboard) return;
  
  keyboard.classList.add('active');
  
  // Initialize keyboard if not already initialized
  if (!keyboard.querySelector('.keyboard-row')) {
    initializeVirtualKeyboard();
  }
  
  // Focus search input
  document.getElementById('searchInput').focus();
}

function closeVirtualKeyboard() {
  const keyboard = document.getElementById('virtualKeyboard');
  if (keyboard) {
    keyboard.classList.remove('active');
  }
}

// Language System (FIXED - No duplicate notifications)
const translations = {
  hi: {
    settingsTitle: 'सेटिंग्स',
    themeTitle: 'थीम',
    themeOriginal: 'मूल',
    themeDark: 'डार्क',
    themeCustom: 'कस्टम',
    languageTitle: 'भाषा',
    langHi: 'हिंदी',
    langEn: 'English',
    fontTitle: 'फ़ॉन्ट',
    fontColorBtn: 'फ़ॉन्ट रंग',
    fontStyleBtn: 'फ़ॉन्ट स्टाइल',
    fontColorDesc: 'पाठ का रंग बदलें',
    fontStyleDesc: 'फ़ॉन्ट स्टाइल चुनें',
    applyColorBtn: 'रंग लागू करें',
    menuHome: 'होम',
    menuAbout: 'हमारे बारे में',
    menuSoch: 'हमारी सोच',
    menuCommunity: 'समुदाय',
    menuJoin: 'जुड़ें',
    menuContact: 'संपर्क करें',
    menuSettings: 'सेटिंग्स',
    logoText: 'अपनी दुनिया',
    heroTitle: 'अपनी दुनिया',
    heroSubtitle: 'सबकी अपनी सोच, सब एक',
    heroDesc: 'एक ऐसा मंच जहाँ सोच अलग हो सकती है, सम्मान नहीं।',
    featuresTitle: 'हमारी विशेषताएँ',
    featuresDesc: 'अपनी दुनिया को मजबूत बनाने वाले स्तंभ',
    card1Title: 'अपनी सोच',
    card1Desc: 'हर विचार का सम्मान',
    card2Title: 'समुदाय',
    card2Desc: 'सबको जोड़ने का मंच',
    card3Title: 'हमारा मिशन',
    card3Desc: 'सकारात्मक बदलाव',
    card4Title: 'हमारी दृष्टि',
    card4Desc: 'एक मजबूत समाज',
    card5Title: 'पारदर्शिता',
    card5Desc: 'खुला और साफ़ सिस्टम',
    card6Title: 'सहायता',
    card6Desc: 'हर सदस्य के साथ',
    footerText: '© 2026 अपनी दुनिया | सबकी अपनी सोच',
    loaderText: 'अपनी दुनिया लोड हो रही है…'
  },
  en: {
    settingsTitle: 'Settings',
    themeTitle: 'Theme',
    themeOriginal: 'Original',
    themeDark: 'Dark',
    themeCustom: 'Custom',
    languageTitle: 'Language',
    langHi: 'हिंदी',
    langEn: 'English',
    fontTitle: 'Font',
    fontColorBtn: 'Font Color',
    fontStyleBtn: 'Font Style',
    fontColorDesc: 'Change text color',
    fontStyleDesc: 'Choose font style',
    applyColorBtn: 'Apply Color',
    menuHome: 'Home',
    menuAbout: 'About Us',
    menuSoch: 'Our Soch',
    menuCommunity: 'Community',
    menuJoin: 'Join',
    menuContact: 'Contact',
    menuSettings: 'Settings',
    logoText: 'Apni Duniya',
    heroTitle: 'Apni Duniya',
    heroSubtitle: 'Everyone\'s own thought, all one',
    heroDesc: 'A platform where thoughts can be different, but respect is not.',
    featuresTitle: 'Our Features',
    featuresDesc: 'The pillars that strengthen Apni Duniya',
    card1Title: 'Your Thought',
    card1Desc: 'Respect for every idea',
    card2Title: 'Community',
    card2Desc: 'Platform to connect everyone',
    card3Title: 'Our Mission',
    card3Desc: 'Positive change',
    card4Title: 'Our Vision',
    card4Desc: 'A strong society',
    card5Title: 'Transparency',
    card5Desc: 'Open and clear system',
    card6Title: 'Support',
    card6Desc: 'With every member',
    footerText: '© 2026 Apni Duniya | Everyone\'s own thought',
    loaderText: 'Loading Apni Duniya…'
  }
};

function changeLanguage(lang){
  // Update all text elements
  Object.keys(translations[lang]).forEach(key => {
    const element = document.getElementById(key);
    if(element) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Store preference
  localStorage.setItem('language', lang);
}

// Load saved preferences on page load (FIXED - No duplicate notifications)
document.addEventListener('DOMContentLoaded', function(){
  // Load theme
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme){
    if(savedTheme === 'custom'){
      const savedColor = localStorage.getItem('customColor');
      if(savedColor){
        document.documentElement.style.setProperty('--primary', savedColor);
        // Update color picker
        const rgb = hexToRgb(savedColor);
        document.getElementById('redSlider').value = rgb.r;
        document.getElementById('greenSlider').value = rgb.g;
        document.getElementById('blueSlider').value = rgb.b;
        updateColorFromSliders();
      }
    } else {
      // Set active button for theme
      document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
      const themeBtn = document.querySelector(`button[onclick*="${savedTheme}"]`);
      if(themeBtn) themeBtn.classList.add('active');
      
      if(savedTheme === 'dark'){
        document.body.classList.add('dark-theme');
      }
    }
  }
  
  // Load language (FIXED - No toast on page load)
  const savedLang = localStorage.getItem('language') || 'hi';
  
  // Apply translations without showing toast
  Object.keys(translations[savedLang]).forEach(key => {
    const element = document.getElementById(key);
    if(element) {
      element.textContent = translations[savedLang][key];
    }
  });
  
  // Update button state without triggering click event
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const langBtn = document.querySelector(`button[onclick*="'${savedLang}'"]`);
  if(langBtn) langBtn.classList.add('active');
  
  // Load font
  const savedFont = localStorage.getItem('font');
  if(savedFont){
    // Set active font item
    document.querySelectorAll('.font-item').forEach(item => {
      item.classList.remove('active');
      if(item.getAttribute('onclick')?.includes(savedFont)) {
        item.classList.add('active');
      }
    });
    
    // Apply font
    const fontClasses = ['font-mukta','font-noto','font-poppins','font-inter',
                        'font-montserrat','font-raleway','font-opensans',
                        'font-roboto','font-playfair','font-lora','font-merriweather'];
    fontClasses.forEach(fc => document.body.classList.remove(fc));
    document.body.classList.add(`font-${savedFont}`);
  }
  
  // Load font color
  const savedFontColor = localStorage.getItem('fontColor');
  if(savedFontColor){
    document.documentElement.style.setProperty('--font-color', savedFontColor);
    document.documentElement.style.setProperty('--text', savedFontColor);
    document.documentElement.style.setProperty('--dark', savedFontColor);
    
    // Update active color in picker
    document.querySelectorAll('.font-colors-container .color-option').forEach(opt => {
      opt.classList.remove('active');
      const bgColor = opt.style.backgroundColor || opt.style.background;
      if(bgColor === savedFontColor) {
        opt.classList.add('active');
      }
    });
  }
  
  // Initialize color picker
  updateColorFromSliders();
  
  // Initialize voice search
  initializeVoiceSearch();
  
  // Add search input event listener
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(performSearch, 300);
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  // Add voice search button listener
  const voiceBtn = document.getElementById('voiceSearchBtn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', toggleVoiceSearch);
  }
  
  // Add close search button listener
  const closeBtn = document.getElementById('closeSearchBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }
  
  // Add keyboard button listener
  const keyboardBtn = document.getElementById('keyboardBtn');
  if (keyboardBtn) {
    keyboardBtn.addEventListener('click', toggleVirtualKeyboard);
  }
  
  // Add keyboard close button listener
  const keyboardCloseBtn = document.getElementById('keyboardCloseBtn');
  if (keyboardCloseBtn) {
    keyboardCloseBtn.addEventListener('click', closeVirtualKeyboard);
  }
  
  // Add space, backspace, enter listeners
  const spaceBtn = document.getElementById('keyboardSpace');
  const backspaceBtn = document.getElementById('keyboardBackspace');
  const enterBtn = document.getElementById('keyboardEnter');
  
  if (spaceBtn) {
    spaceBtn.addEventListener('click', () => handleKeyPress(' '));
  }
  
  if (backspaceBtn) {
    backspaceBtn.addEventListener('click', () => handleKeyPress('backspace'));
  }
  
  if (enterBtn) {
    enterBtn.addEventListener('click', () => handleKeyPress('enter'));
  }
  
  // Close search when clicking outside
  document.addEventListener('click', function(e) {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    if (searchContainer && searchContainer.classList.contains('active')) {
      if (!searchContainer.contains(e.target) && 
          !e.target.classList.contains('search-toggle') && 
          !e.target.closest('.search-toggle')) {
        closeSearch();
      }
    }
  });
  
  // Handle Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeVirtualKeyboard();
      closeSearch();
    }
  });
});


function goCert(){

closeMenu();

document.getElementById("normalSpinner").style.display="none";
document.getElementById("specialLoader").style.display="flex";

document.getElementById("loader").style.display="flex";

setTimeout(()=>{
location.href="card.html";
},3000);
}

function goShabd(){

closeMenu();

document.getElementById("normalSpinner").style.display="none";
document.getElementById("specialLoader").style.display="flex";

document.getElementById("loader").style.display="flex";

setTimeout(()=>{
location.href="s.html";
},3000);
}

function officialLogin(){
  document.getElementById("loaderBox").style.display="flex";

  setTimeout(()=>{
    document.getElementById("loaderBox").style.display="none";
  },3000);
}

function comingSoon(){
  document.getElementById("popup").style.display="flex";
}

function closePopup(){
  document.getElementById("popup").style.display="none";
}

function officialLogin(){
  document.getElementById("loaderBox").style.display="flex";

  setTimeout(()=>{
    window.location.href="admin-panel.html";
  },3000);
}

function comingSoon(){
  document.getElementById("popup").style.display="flex";
}

function closePopup(){
  document.getElementById("popup").style.display="none";
}
function openWithLoader(url) {
  document.getElementById("loaderPopup").style.display = "flex";
  setTimeout(() => {
    window.location.href = url;
  }, 3000);
}

function comingSoon() {
  document.getElementById("comingSoon").style.display = "flex";
}

function closeSoon() {
  document.getElementById("comingSoon").style.display = "none";
}
function showUserSoon() {
  document.querySelector(".user-soon-overlay").style.display = "flex";
}

function hideUserSoon() {
  document.querySelector(".user-soon-overlay").style.display = "none";
}
function closeForce() {
  document.getElementById("forceDialog").style.display = "none";
}

function goInstall() {
  alert("Chrome menu (⋮) → Add to Home Screen");
}
