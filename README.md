# 🧾 HTML to PDF – Community Node for n8n
# n8n-nodes-html-to-pdf-puppeteer-gs

Community node para **n8n** que convierte **HTML a PDF** utilizando **Puppeteer (Chromium)**.

![npm](https://img.shields.io/npm/v/n8n-nodes-html-to-pdf-puppeteer-gs)
![downloads](https://img.shields.io/npm/dw/n8n-nodes-html-to-pdf-puppeteer-gs)
![license](https://img.shields.io/npm/l/n8n-nodes-html-to-pdf-puppeteer-gs)

---

## ✨ Características

- Convierte HTML a PDF
- Soporta:
  - HTML como **string**
  - HTML como **archivo binario**
- Preserva:
  - CSS
  - Colores y gradientes
  - Emojis
- Devuelve el PDF como **binario**, listo para:
  - Email
  - Google Drive
  - S3
  - Webhooks
- Compatible con **n8n en Docker**

---

## 📦 Instalación

### Desde la UI de n8n (recomendado)

1. Ir a **Settings → Community Nodes**
2. Clic en **Install**
3. Buscar e instalar:

n8n-nodes-html-to-pdf-puppeteer-gs


4. Reiniciar n8n

---

### Instalación manual (opcional)

```bash
npm install n8n-nodes-html-to-pdf-puppeteer-gs
```

## 🚀 Uso básico
### Entrada como HTML string

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hola n8n 👋</h1>
    <p>Este PDF fue generado desde HTML</p>
  </body>
</html>
```

### Configura el nodo:

- Input Type: HTML String
- HTML String: tu HTML


### Entrada como archivo binario

- Usa un nodo como Read Binary File

#### Configura:

- Input Type: Binary Data

- Binary Property: data (o el nombre que uses)


## 📤 Salida

### El nodo devuelve:

- Binary Property: pdf
- Mime Type: application/pdf

#### Compatible con:

- Email
- Google Drive
- Dropbox
- S3
- Respond to Webhook


## 🐳 Docker (importante)

- Este nodo usa Puppeteer, por lo que tu imagen de n8n debe incluir Chromium.
- Ejemplo (Alpine):

```
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  font-noto

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

## ⚠️ Requisitos

- n8n v1+
- Node.js 18+
- Chromium disponible en el sistema (Docker recomendado)


## 🧩 Compatibilidad

- n8n self-hosted
- Docker (Alpine / Ubuntu)
- Linux


## 📄 Licencia

- MIT

## 👤 Autor

- Gean Pearre Silva Lojas


## 💬 Soporte

- Para problemas o sugerencias:
- Comunidad n8n
- Issues del repositorio (si está disponible)
