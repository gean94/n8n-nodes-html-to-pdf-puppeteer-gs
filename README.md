# 🧾 HTML to PDF – Community Node for n8n
# n8n-nodes-html-to-pdf-puppeteer-gs

Community node para **n8n** que convierte **HTML a PDF** utilizando **Puppeteer (Chromium)**.

![npm](https://img.shields.io/npm/v/n8n-nodes-html-to-pdf-puppeteer-gs)
![downloads](https://img.shields.io/npm/dw/n8n-nodes-html-to-pdf-puppeteer-gs)
![license](https://img.shields.io/npm/l/n8n-nodes-html-to-pdf-puppeteer-gs)


> Nodo personalizado para n8n que convierte contenido HTML en PDF utilizando **Puppeteer** y un navegador remoto con **Browserless** dentro de Docker.

---

## ✨ Características

Genera PDFs con soporte completo para:

- 🎨 Gradientes CSS
- 🖼️ Colores de fondo
- 😀 Emojis
- 🔤 Fuentes personalizadas
- 💅 Estilos complejos

---

## 📦 Estructura del Proyecto

```
.
├── HtmlToPdf.node.ts
├── HtmlToPdf.description.ts
├── Dockerfile
├── docker-compose.yml
└── .env
```

---

## 🚀 Funcionamiento

El nodo realiza el siguiente flujo:

1. Recibe HTML como **String** o **archivo binario**
2. Se conecta a **Browserless** (Chrome remoto)
3. Renderiza el HTML con todos sus recursos
4. Genera un PDF en formato **A4**
5. Devuelve el archivo como **binario** en n8n

---

## ⚙️ Configuración

### 1️⃣ Variable de entorno (`.env`)

```env
PUPPETEER_EXECUTABLE_PATH=ws://browserless:3000
```

> Esta variable indica a Puppeteer que debe conectarse al navegador remoto de Browserless en lugar de lanzar Chrome localmente.

---

### 2️⃣ `docker-compose.yml`

```yaml
services:
  n8n:
    build: .
    image: n8n-custom
    container_name: n8n
    restart: always
    ports:
      - "5678:5678"
    env_file:
      - .env
    volumes:
      - ./data:/home/node/.n8n
    depends_on:
      - browserless

  browserless:
    image: browserless/chrome:latest
    container_name: browserless
    restart: always
    ports:
      - "3000:3000"
    environment:
      - MAX_CONCURRENT_SESSIONS=10
```

**Servicios:**

| Servicio | Descripción |
|----------|-------------|
| `n8n` | Instancia personalizada con el nodo HTML to PDF incluido |
| `browserless` | Chrome headless con soporte de sesiones concurrentes vía WebSocket (puerto 3000) |

---

### 3️⃣ `Dockerfile`

```dockerfile
FROM n8nio/n8n:next

USER node

RUN npm install xlsx mammoth nodejs-polars --prefix /home/node/.n8n
RUN chmod -R 755 /home/node/.n8n || true

ENV PUPPETEER_EXECUTABLE_PATH=ws://browserless:3000

ENTRYPOINT ["tini", "--"]
CMD ["n8n", "start"]
```

---

## 🧠 Implementación Técnica

### 🔹 Conexión a Browserless

Gracias a la variable de entorno `PUPPETEER_EXECUTABLE_PATH`, Puppeteer se conecta automáticamente al Chrome remoto:

```typescript
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
```

### 🔹 Renderizado HTML

```typescript
await page.setContent(html, { waitUntil: 'networkidle0' });
```

Esto garantiza que imágenes, fuentes y recursos externos estén completamente cargados antes de generar el PDF.

### 🔹 Generación del PDF

```typescript
const pdfBuffer = await page.pdf({
  format: 'A4',
  printBackground: true,
  scale: 1,
});
```

> **`printBackground: true`** es clave para renderizar correctamente gradientes, backgrounds CSS y colores.

---

## 📥 Entrada del Nodo

**Opción 1 — HTML String**  
Recibe HTML directamente como texto.

**Opción 2 — Binary Data**  
Recibe un archivo HTML como propiedad binaria:

```json
{
  "binary": {
    "data": {
      "data": "BASE64_STRING"
    }
  }
}
```

---

## 📤 Salida del Nodo

```json
{
  "json": {
    "fileName": "reporte-123456.pdf",
    "fileSize": 12345,
    "fileExtension": "pdf",
    "mimeType": "application/pdf"
  },
  "binary": {
    "pdf": {
      "data": "BASE64",
      "mimeType": "application/pdf",
      "fileName": "reporte-123456.pdf"
    }
  }
}
```

---

## 🛠 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone 
cd 
```

### 2️⃣ Construir los contenedores

```bash
docker-compose up --build
```

### 3️⃣ Acceder a n8n

```
http://localhost:5678
```

---

## 📈 Escalabilidad

Puedes aumentar el número de PDFs simultáneos ajustando la variable en `docker-compose.yml`:

```yaml
MAX_CONCURRENT_SESSIONS=10
```

---

## 🔐 Seguridad

Los flags `--no-sandbox` y `--disable-setuid-sandbox` se utilizan porque Chrome corre dentro de un contenedor Docker aislado.

Para entornos productivos expuestos a internet se recomienda:

- Colocar Browserless detrás de un proxy inverso
- Implementar autenticación
- Limitar el número de sesiones concurrentes

---

## 🎯 Casos de Uso

- 📊 Generación de reportes automáticos
- 🧾 Facturas
- 🏅 Certificados
- 📄 Documentos personalizados
- ⚙️ PDFs desde workflows automatizados en n8n

---

## 🧩 Compatibilidad

| Tecnología | Versión |
|------------|---------|
| n8n | Custom build |
| Docker | Compatible |
| Browserless Chrome | `latest` |
| Puppeteer | Compatible con WS remoto |

---

## 👨‍💻 Autor

Desarrollado por **Gean Silva**  
Nodo personalizado para entornos Docker con Chrome remoto vía Browserless.
