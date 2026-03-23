/* 
   script.js - Smooflix | Die Smoothie-Suche
   Míriam Domínguez Martínez - 23.03.2026
*/

/* ================================================================
   STEP 1: DOM REFERENCES
   Grab all the elements we need to read from or write to.
*/

const generateBtn    = document.getElementById('generateBtn');
const smoothieInput  = document.getElementById('smoothieInput');
const resultCard     = document.getElementById('resultCard');
const errorMsg       = document.getElementById('errorMsg');

const smoothieName   = document.getElementById('smoothieName');
const smoothieImage  = document.getElementById('smoothieImage');
const smoothieFlavor = document.getElementById('smoothieFlavor');
const ingredientList = document.getElementById('ingredientList');

/* ================================================================
   STEP 2: API BASE URL
*/

const API_URL = 'https://storage01.dbe.academy/fswd/api-smoothie-mixer/';

/* ================================================================
   STEP 3: FETCH SMOOTHIE
   Builds the URL from user input, sends a GET request via fetch(),
   and hands the parsed response off to renderSmoothie().
*/

function fetchSmoothie() {

  // Read and trim the user input
  const userInput = smoothieInput.value.trim();

  // Guard: do nothing if the field is empty
  if (!userInput) {
    showError('Bitte gib einen Smoothie-Namen ein!');
    return;
  }

  // Hide any previous error
  hideError();

  // Build the full URL with the GET parameter
  const url = `${API_URL}?smoothiename=${encodeURIComponent(userInput)}`;

  // Debug: log the full URL before sending
  console.log('Fetching:', url);

  // Send the GET request
  fetch(url)
    .then(function (response) {

      // Throw for HTTP errors (e.g. 404, 500)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // Parse the response body as JSON
      return response.json();
    })
    .then(function (data) {

      // Debug: inspect the full API response
      console.log('API response:', data);

      // Hand off to the render function
      renderSmoothie(data);
        localStorage.setItem('lastSmoothieInput', userInput);
        localStorage.setItem('lastSmoothieData', JSON.stringify(data));
    })
    .catch(function (error) {
      console.error('Fetch error:', error);
      showError('Smoothie konnte nicht geladen werden. Bitte versuche es erneut.');
    });
}

/* ================================================================
   STEP 4: RENDER SMOOTHIE
   Takes the parsed JSON and fills in the result section of the page.
*/

function renderSmoothie(data) {

  // The API wraps the result inside a "data" object
  const smoothie = data.data;

  // Fill in name, image, and flavor badge
  smoothieName.textContent       = smoothie.name;
  smoothieImage.src              = smoothie.image;
  smoothieImage.alt              = smoothie.name;
  smoothieFlavor.textContent     = smoothie.taste;

  // Rebuild the ingredients list from scratch
  ingredientList.innerHTML = '';

  smoothie.ingredients.forEach(function (ingredient) {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientList.appendChild(li);
  });
}

/* ================================================================
   STEP 5: ERROR HELPERS
*/

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add('visible');
}

function hideError() {
  errorMsg.textContent = '';
  errorMsg.classList.remove('visible');
}

/* ================================================================
   STEP 6: EVENT LISTENERS
*/

// Button click → fetch smoothie
generateBtn.addEventListener('click', fetchSmoothie);

// Enter key inside the input → fetch smoothie
smoothieInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    fetchSmoothie();
  }
});

/* ================================================================
   STEP 7: RESTORE LAST SEARCH ON PAGE LOAD
*/


// Read localStorage on startup and restore last state
const savedInput = localStorage.getItem('lastSmoothieInput');
const savedData  = localStorage.getItem('lastSmoothieData');

if (savedInput && savedData) {
  // Restore the search field and re-render the last result
  smoothieInput.value = savedInput;
  renderSmoothie(JSON.parse(savedData));
}
