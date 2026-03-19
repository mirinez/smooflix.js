## ¿Qué hace Smooflix y cómo funciona?

### ¿Qué es Smooflix?

Es una página web que **habla con un servidor externo** para pedirle información sobre un smoothie. Tú escribes un nombre, y el servidor te devuelve los datos de ese smoothie.

---

### ¿Cómo funciona paso a paso?

**1. El usuario escribe un nombre y pulsa el botón**

```
"Bananen-Smoothie" → click en "Smoothie generieren"
```

**2. JavaScript construye una URL con ese nombre**

```
https://storage01.dbe.academy/fswd/api-smoothie-mixer/?smoothiename=Bananen-Smoothie
```

Esto es como decirle al servidor: *"oye, dame info sobre el Bananen-Smoothie"*

**3. `fetch()` manda esa petición al servidor en segundo plano**

Sin recargar la página. Mientras espera la respuesta, el usuario puede seguir viendo la web. Esto es exactamente lo que es **AJAX** - comunicación asíncrona.

**4. El servidor responde con un JSON**

```json
{
  "name": "Bananen-Smoothie",
  "image": "https://...",
  "flavor": "Fruchtig & Erfrischend",
  "ingredients": ["Banane", "Erdbeere", "Joghurt", "Honig", "Eiswürfel"]
}
```

**5. JavaScript coge esos datos y los mete en el HTML**

```js
smoothieName.textContent   = data.name       // → título
smoothieImage.src          = data.image      // → imagen
smoothieFlavor.textContent = data.flavor     // → badge
// y genera los <li> de la lista de ingredientes
```

---

### ¿Por qué es importante este ejercicio?

Porque así funciona **prácticamente toda la web moderna**:

| Ejemplo real | Lo que hace |
|---|---|
| Google Maps | Pide datos de rutas a un servidor |
| Instagram | Carga fotos desde una API |
| Booking.com | Busca hoteles en tiempo real |
| Tu Smooflix | Pide datos de smoothies a una API |

La diferencia con páginas estáticas es que los datos **no están escritos en el HTML** - vienen de fuera, en tiempo real, según lo que pide el usuario.

---

### Resumen en una frase

> El usuario escribe un nombre → JavaScript manda una petición a un servidor → el servidor responde con datos en JSON → JavaScript muestra esos datos en la página, sin recargar nada.
