## Smooflix – Hausaufgabe
**Autorin:** Míriam Domínguez Martínez  
**Datum:** 19.03.2026  
**Kurs:** Full Stack Web Development - DBE Academy  
**Thema:** JavaScript & AJAX - Die Smoothie-Suche

---

### Projektbeschreibung

Dieses Projekt ist eine interaktive Smoothie-Such-App, Smooflix, erstellt mit HTML, CSS und JavaScript. Ziel der Aufgabe war es, die Grundlagen von AJAX und API-Abfragen praktisch anzuwenden: asynchrone Datenübertragung mit `fetch()`, Verarbeitung von JSON-Antworten sowie dynamische DOM-Manipulation. Die App ermöglicht es dem Benutzer, einen Smoothie-Namen einzugeben, woraufhin eine GET-Anfrage an eine externe API gesendet wird und die zurückgegebenen Daten – Name, Bild, Geschmack und Zutaten – direkt auf der Seite angezeigt werden.

---

### Dateistruktur

```
/
├── index.html
├── style.css
├── script.js
├── README.md
├── guide/
│   ├── guide-eng.md
│   ├── guide-esp.md
│   └── problems-solutions.md
├── template/
│   ├── Smooflix.pdf
│   └── Style Guide Smooflix.pdf
├── fonts/
│   ├── Poppins-Regular.ttf
│   ├── Poppins-SemiBold.ttf
│   └── Poppins-Bold.ttf
└── img/
    └── smoothie.png
```

---

### API

Die App kommuniziert mit folgender API:

```
https://storage01.dbe.academy/fswd/api-smoothie-mixer/?smoothiename=DrachenSmoothie
```

Die API gibt ein JSON-Objekt zurück:

```json
{
  "success": true,
  "data": {
    "name": "Drachen-Smoothie",
    "taste": "Würzig & Wärmend",
    "image": "https://...",
    "ingredients": ["Mango", "Chili", "Ingwer"]
  }
}
```

---

### Farbpalette & Style Guide

| Variable | Wert |
|---|---|
| `--white` | `#FFFFFF` |
| `--black` | `#000000` |
| `--gray-light` | `#EEEEEE` |
| `--gray-mid` | `#D3D3D3` |
| `--accent` | `#7B68EE` |
| `--gradient-hero` | `linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)` |
| `--gradient-btn` | `linear-gradient(135deg, #8B7ED8 0%, #7C3AED 100%)` |
| `--gradient-badge` | `linear-gradient(135deg, #FFB347 0%, #FF67C0 100%)` |

---

*Full Stack Web Development Kurs – DBE Academy, 2026.*
