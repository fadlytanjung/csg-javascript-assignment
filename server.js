import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const srcDir = path.join(__dirname, "src");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  const normalizedPath =
    urlPath === "/"
      ? "/index.html"
      : path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");

  const tryPaths = [
    path.join(publicDir, normalizedPath),
    path.join(srcDir, normalizedPath),
  ];

  let found = false;

  for (let filePath of tryPaths) {
    let ext = path.extname(filePath);

    if (!ext && fs.existsSync(filePath + ".html")) {
      filePath += ".html";
      ext = ".html";
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const mimeType = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mimeType });
      fs.createReadStream(filePath).pipe(res);
      found = true;
      break;
    }
  }

  if (!found) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
