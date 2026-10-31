/**
 * Business Analysis Learning Lab - Lightweight Local Development Server
 * Zero dependencies, built with native Node.js HTTP & File System APIs
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const DEFAULT_PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".csv": "text/plain; charset=UTF-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

function serveFile(req, res, port) {
  let reqPath = decodeURI(req.url.split("?")[0]);
  if (reqPath === "/" || reqPath === "") reqPath = "/index.html";

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, "");
  let filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - Halaman Tidak Ditemukan</title></head>
        <body style="font-family: sans-serif; background: #0f172a; color: #ffffff; text-align: center; padding: 50px;">
          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>File <code>${safePath}</code> tidak ditemukan di server lokal.</p>
          <a href="/" style="color: #6366f1;">Kembali ke Dashboard Utama</a>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

function startServer(port) {
  const server = http.createServer((req, res) => serveFile(req, res, port));

  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Business Analysis Learning Lab Berjalan Lokal!`);
    console.log(`📡 URL Lokal : http://localhost:${port}`);
    console.log(`📁 Direktori : ${__dirname}`);
    console.log(`⚡ 100% Offline Ready - Tanpa dependensi eksternal / CDN`);
    console.log(`======================================================\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${port} sedang digunakan, mencoba port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(DEFAULT_PORT);
