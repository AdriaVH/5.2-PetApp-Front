// AIProjectPrompterReact.js
const { app, BrowserWindow, ipcMain, clipboard } = require("electron");
const fs = require("fs");
const path = require("path");

const MAX_CHARS = 18000; // max chars per batch

// Automatically detect project root (assume package.json exists)
function findRoot(dir = process.cwd()) {
  let current = dir;
  while (!fs.existsSync(path.join(current, "package.json"))) {
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return current;
}

const ROOT = findRoot();

// Collect relevant files for AI understanding
function collectFiles(dir, includeStyles) {
  const results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!["node_modules", "build", "dist", ".git", ".idea"].includes(file)) {
        results.push(...collectFiles(filePath, includeStyles));
      }
    } else {
      const ext = path.extname(file);
      if (
        ext === ".json" || ext === ".js" || ext === ".jsx" ||
        (includeStyles && (ext === ".css" || ext === ".html"))
      ) {
        if (!file.includes("package-lock")) results.push(filePath);
      }
    }
  }
  return results;
}

// Create AI-friendly batches
function createBatches(files, maxChars) {
  const batches = [];
  let current = "";

  for (const file of files) {
    let content = `=== FILE: ${path.relative(ROOT, file)} ===\n`;
    try {
      let text = fs.readFileSync(file, "utf8");

      // Remove excessive blank lines to save space
      text = text.replace(/\n\s*\n/g, "\n");

      content += text + "\n\n";
    } catch (err) {
      content += `// Error reading file: ${err.message}\n\n`;
    }

    if (content.length > maxChars) {
      let start = 0;
      while (start < content.length) {
        const chunk = content.slice(start, start + maxChars - 200);
        batches.push(chunk);
        start += maxChars - 200;
      }
      continue;
    }

    if (current.length + content.length > maxChars - 200) {
      batches.push(current);
      current = "";
    }
    current += content;
  }

  if (current.trim().length > 0) batches.push(current);

  // Merge extra batches if necessary (avoid too many tiny batches)
  while (batches.length > 6) {
    const last = batches.pop();
    batches[batches.length - 1] += "\n" + last;
  }

  return batches;
}

function getBatches(includeStyles = true) {
  const files = collectFiles(ROOT, includeStyles);
  return createBatches(files, MAX_CHARS);
}

// Electron UI
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const htmlContent = `
  <html>
  <head>
    <title>AI Project Prompter</title>
    <style>
      body{font-family:sans-serif;padding:20px;}
      textarea{width:100%;height:150px;margin-top:10px;}
      button{margin:5px 0;}
      h1{margin-bottom:20px;}
      label{display:block;margin-bottom:10px;}
    </style>
  </head>
  <body>
    <h1>AI Project Prompter (JS)</h1>
    <label>
      <input type="checkbox" id="includeStyles" checked /> Include CSS & HTML
    </label>
    <button onclick="window.scan()">Scan Project</button>
    <div id="batches"></div>

    <script>
      const { ipcRenderer } = require("electron");

      function escapeHtml(text) {
        return text.replace(/&/g,"&amp;")
                   .replace(/</g,"&lt;")
                   .replace(/>/g,"&gt;");
      }

      window.scan = () => {
        const includeStyles = document.getElementById("includeStyles").checked;
        ipcRenderer.invoke("scan", includeStyles).then(batches => {
          const container = document.getElementById("batches");
          container.innerHTML = "";
          window.batches = batches;

          batches.forEach((batch,i) => {
            const div = document.createElement("div");
            const safeText = escapeHtml(batch);
            div.innerHTML = \`
              <button onclick="window.copy(\${i})">Copy Batch \${i+1}</button>
              <textarea readonly>\${safeText}</textarea>
            \`;
            container.appendChild(div);
          });
        });
      };

      window.copy = (i) => {
        ipcRenderer.send("copy", window.batches[i]);
        alert("Batch " + (i+1) + " copied!");
      };
    </script>
  </body>
  </html>
  `;

  win.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(htmlContent));
}

// App lifecycle
app.whenReady().then(() => {
  ipcMain.handle("scan", (_, includeStyles) => getBatches(includeStyles));
  ipcMain.on("copy", (_, text) => clipboard.writeText(text));
  createWindow();
});
