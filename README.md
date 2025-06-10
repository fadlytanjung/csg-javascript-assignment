# CSG JavaScript Assignment

## ✨ Features

- **Two-page SPA** with clean Tailwind UI
- **Page 1**: Searchable posts list with “rerum” highlight and comment modal
- **Page 2**: Reports for posts containing “rerum” and post counts per user
- Fully responsive, interactive UI with pagination and tooltips

## 🛠 Technologies

- HTML + Tailwind CSS (CLI build)
- Vanilla JavaScript with ES6 Modules
- No frameworks or third-party libraries used
- Custom Node.js HTTP server (no Express)

## 🚀 Running Locally

### Using Node.js

Make sure you have **Node.js v18+ or v22+** installed.

```bash
npm start
```

Visit http://localhost:4000

### Using Docker

If you prefer running in Docker:

```bash
docker build -t js-dev-assignment .
docker run -p 4000:4000 js-dev-assignment
```

Then open http://localhost:4000

> Tailwind CSS is already compiled into `/public/css/output.css`. No build step is needed.

## 📁 Project Structure

```
project-root/
├── public/
│   ├── index.html
│   ├── reports.html
│   ├── assets/         # Images and icons
│   └── css/            # Compiled Tailwind CSS (output.css)
├── src/
│   ├── main.js         # Main script entry
│   ├── constants.js
│   ├── templates.js
│   └── ...
├── server.js           # Lightweight Node.js server
├── Dockerfile
└── package.json
```

## ✅ Notes

- JS is modular and structured (separation of concerns)
- Tailwind built manually via CLI:  
  npx tailwindcss -i ./public/css/base.css -o ./public/css/tailwind.css --minify
- No client-side frameworks or bundlers used
