## What does Smooflix do and how does it work?

### What is Smooflix?

It's a web page that **talks to an external server** to request information about a smoothie. You type a name, and the server sends back that smoothie's data.

---

### How it works — step by step

**1. The user types a name and clicks the button**

```
"Bananen-Smoothie" → click on "Smoothie generieren"
```

**2. JavaScript builds a URL with that name**

```
https://storage01.dbe.academy/fswd/api-smoothie-mixer/?smoothiename=Bananen-Smoothie
```

This is like telling the server: *"hey, give me info about the Bananen-Smoothie"*

**3. `fetch()` sends that request to the server in the background**

Without reloading the page. While waiting for the response, the user can keep interacting with the page. This is exactly what **AJAX** is — asynchronous communication.

**4. The server responds with JSON**

```json
{
  "name": "Bananen-Smoothie",
  "image": "https://...",
  "flavor": "Fruchtig & Erfrischend",
  "ingredients": ["Banane", "Erdbeere", "Joghurt", "Honig", "Eiswürfel"]
}
```

**5. JavaScript takes that data and puts it into the HTML**

```js
smoothieName.textContent   = data.name       // → title
smoothieImage.src          = data.image      // → image
smoothieFlavor.textContent = data.flavor     // → badge
// and generates the <li> elements for the ingredients list
```

---

### Why does this exercise matter?

Because this is how **almost every modern website** works:

| Real example | What it does |
|---|---|
| Google Maps | Requests route data from a server |
| Instagram | Loads photos from an API |
| Booking.com | Searches hotels in real time |
| Your Smooflix | Requests smoothie data from an API |

The difference from static pages is that the data is **not written in the HTML** — it comes from outside, in real time, based on what the user asks for.

---

### Summary in one sentence

> The user types a name → JavaScript sends a request to a server → the server responds with JSON data → JavaScript displays that data on the page, without reloading anything.
