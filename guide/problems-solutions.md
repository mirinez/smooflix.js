## Smooflix - Problems & Solutions Log

---

### Problem: The API was returning an error no matter what was typed

**What happened:**
Every search returned an error message, even with valid smoothie names.

**Why:**
The API JSON response wraps all data inside a nested `data` object, and the field for the flavor is called `taste`, not `flavor`. The code was trying to access fields that didn't exist at the level it was looking.

**The API actually returns this:**
```json
{
  "success": true,
  "message": "GET-Anfrage erfolgreich empfangen.",
  "data": {
    "name": "Bananen-Smoothie",
    "ingredients": ["Banane", "Kiwi", "..."],
    "taste": "Würzig & Wärmend",
    "image": "https://..."
  }
}
```

**Solution:**
Two fixes in `script.js` inside `renderSmoothie()`:

```js
// BEFORE — wrong field names, wrong level
smoothieName.textContent   = data.name;
smoothieFlavor.textContent = data.flavor;

// AFTER — correct nesting and correct field name
const smoothie = data.data;
smoothieName.textContent   = smoothie.name;
smoothieFlavor.textContent = smoothie.taste;
```

---

### Problem: The footer had a white background and was floating outside the card

**What happened:**
The footer appeared outside the `.app-card`, floating to the right with a white background instead of sitting neatly at the bottom of the card.

**Why:**
The `<footer>` tag was placed after the closing `</div>` of `.app-card` in the HTML, so it rendered outside the card entirely. The background color was also set to `var(--white)`, which made it stand out against the purple page background.

**Solution:**
Move the `<footer>` inside `.app-card`, after the `.card-body` closing tag:

```html
<!-- BEFORE — footer outside the card -->
  </div> <!-- .app-card -->
  <footer>...</footer>

<!-- AFTER — footer inside the card -->
    <footer>...</footer>
  </div> <!-- .app-card -->
```

And update the CSS:

```css
/* BEFORE */
footer {
  background-color: var(--white);
}

/* AFTER */
footer {
  background-color: var(--gray-light); /* matches the card body */
}
```

---

### Problem: The smoothie image had a white box around it

**What happened:**
After removing the white background from `.result-section`, the image appeared inside a visible white rectangle.

**Why:**
The fix being used to remove the black background from the PNG was `mix-blend-mode: multiply` with a white parent background. This technique works by blending black pixels into the white background, making them invisible. When the parent background was changed to `transparent`, the blend mode had nothing to work against and the white box from the image wrapper became visible instead.

**Root cause:**
The image itself has a solid black background baked in - it has no transparent alpha channel. The real fix is to remove the background from the image file using a tool like [remove.bg](https://www.remove.bg) or Photoshop.

**Temporary CSS fix:**
Remove the white background and blend mode from the image wrapper:

```css
/* BEFORE */
.image-wrapper {
  background: #ffffff;
}
.image-wrapper img {
  mix-blend-mode: multiply;
}

/* AFTER */
.image-wrapper {
  background: transparent;
}
.image-wrapper img {
  /* mix-blend-mode removed */
}
```

---

### Problem: fetch() worked in the browser URL bar but not in the code

**What happened:**
Pasting the API URL directly into the browser returned a valid JSON response, but the same URL called via `fetch()` in JavaScript threw a network error.

**Why:**
This is a **CORS (Cross-Origin Resource Sharing)** issue. When a browser makes a `fetch()` request from a page, the server must explicitly allow it. Opening the file via `file://` (double-clicking) blocks fetch entirely. Even with Live Server, if the API server does not send the right CORS headers, the browser will block the response.

**Solution:**
Always open the project through **Live Server** (`http://127.0.0.1:5500`) instead of double-clicking the file. If the API still blocks requests, that is a server-side restriction - the client-side code cannot fix it.

```js
// To debug, check the browser console for messages like:
// "Access to fetch at '...' has been blocked by CORS policy"
// This confirms it is a CORS issue, not a code bug.
```

---

### Problem: The ingredients list kept adding duplicates on every search

**What happened:**
Each time a new smoothie was searched, the old ingredients remained and the new ones were added on top, making the list grow with every request.

**Why:**
The `<ul>` already contained placeholder `<li>` items. The `forEach` loop in `renderSmoothie()` was appending new items without clearing the existing ones first.

**Solution:**
Clear the list before rebuilding it:

```js
// BEFORE — just appends, never clears
smoothie.ingredients.forEach(function (ingredient) {
  const li = document.createElement('li');
  li.textContent = ingredient;
  ingredientList.appendChild(li);
});

// AFTER — clear first, then rebuild
ingredientList.innerHTML = '';

smoothie.ingredients.forEach(function (ingredient) {
  const li = document.createElement('li');
  li.textContent = ingredient;
  ingredientList.appendChild(li);
});
```

---

### Problem: Submitting an empty input caused unexpected behaviour

**What happened:**
Clicking the button with an empty input field caused `fetch()` to be called with an incomplete URL, which either crashed or returned unexpected results from the API.

**Why:**
There was no validation check before sending the request. The URL ended up as `...?smoothiename=` with no value, which the API could not handle.

**Solution:**
Add a guard at the start of `fetchSmoothie()` that stops execution if the field is empty:

```js
function fetchSmoothie() {
  const userInput = smoothieInput.value.trim();

  // Guard: stop here if the field is empty
  if (!userInput) {
    showError('Bitte gib einen Smoothie-Namen ein!');
    return;
  }

  // Only reaches here if input is valid
  const url = `${API_URL}?smoothiename=${encodeURIComponent(userInput)}`;
  fetch(url)...
}
```

---

### Problem: Special characters in the smoothie name broke the URL

**What happened:**
Smoothie names containing spaces, umlauts (ä, ö, ü) or other special characters caused the fetch request to fail or return unexpected results.

**Why:**
URLs can only contain certain characters. Spaces, accented letters and symbols must be **encoded** before being placed in a URL. For example, a space becomes `%20` and `ä` becomes `%C3%A4`.

**Solution:**
Wrap the user input in `encodeURIComponent()` when building the URL:

```js
// BEFORE — raw input, breaks with special characters
const url = `${API_URL}?smoothiename=${userInput}`;

// AFTER — encoded, handles any input safely
const url = `${API_URL}?smoothiename=${encodeURIComponent(userInput)}`;
```

