/* eslint-disable no-console */
// Splits inline <script> blocks in index.html into separate files under ./js
// while preserving script order and attributes. This is intended to be a
// semantics-preserving refactor for a large single-file offline build.
//
// Usage: node tools/split-inline-scripts.js
//
// Notes:
// - External <script src="..."> tags are left as-is.
// - Inline script bodies are written byte-for-byte as extracted (UTF-8 text).
// - index.html is rewritten in-place to reference the extracted files.
// - A manifest is written to tools/split-inline-scripts.manifest.json.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "index.html");
const OUT_DIR = path.join(ROOT, "js");
const MANIFEST = path.join(__dirname, "split-inline-scripts.manifest.json");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function hasAttr(openTag, attrName) {
  const re = new RegExp(`\\b${attrName}\\s*=`, "i");
  return re.test(openTag);
}

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
}

function chooseName(scriptBody, idx, usedNames) {
  const rules = [
    ["websocket-polyfill", "window.__websocketPolyfill"],
    ["process-polyfill", "window.process ="],
    ["require-polyfill", "window.require ="],
    ["globals-polyfill", "window.global"],
    ["defs-export", "window.defExport"],
    ["boot-origin", "let origin = window.location.href.split(\"index.html\")"],
    ["config", "module.exports(\"config.json\""],
    ["mockup-polyfill", "window.__mockupPolyfill"],
    ["tokens", "window.tokens"],
    ["tankgen-results", "module.exports(\"tankGenRESULTS\""],
  ];

  for (const [name, needle] of rules) {
    if (scriptBody.includes(needle)) {
      const base = `${String(idx).padStart(2, "0")}-${name}.js`;
      if (!usedNames.has(base)) return base;
      // If duplicated, fall through to a numbered suffix.
      for (let j = 2; j < 1000; j++) {
        const alt = `${String(idx).padStart(2, "0")}-${name}-${j}.js`;
        if (!usedNames.has(alt)) return alt;
      }
    }
  }

  const base = `${String(idx).padStart(2, "0")}-part.js`;
  if (!usedNames.has(base)) return base;
  for (let j = 2; j < 1000; j++) {
    const alt = `${String(idx).padStart(2, "0")}-part-${j}.js`;
    if (!usedNames.has(alt)) return alt;
  }
  return `${String(idx).padStart(2, "0")}-part-${Date.now()}.js`;
}

function main() {
  ensureDir(OUT_DIR);
  const html = fs.readFileSync(INDEX_HTML, "utf8");

  let out = "";
  let pos = 0;
  let scriptIdx = 0;
  const usedNames = new Set();
  const manifest = {
    indexHtml: path.relative(ROOT, INDEX_HTML).replace(/\\/g, "/"),
    outDir: path.relative(ROOT, OUT_DIR).replace(/\\/g, "/"),
    extracted: [],
  };

  while (true) {
    const openStart = html.toLowerCase().indexOf("<script", pos);
    if (openStart === -1) {
      out += html.slice(pos);
      break;
    }

    out += html.slice(pos, openStart);

    const openEnd = html.indexOf(">", openStart);
    if (openEnd === -1) {
      throw new Error("Malformed HTML: <script without closing '>'");
    }

    const openTag = html.slice(openStart, openEnd + 1);
    const closeTag = "</script>";
    const closeStart = html.toLowerCase().indexOf(closeTag, openEnd + 1);
    if (closeStart === -1) {
      throw new Error("Malformed HTML: <script without closing </script>");
    }
    const closeEnd = closeStart + closeTag.length;

    const body = html.slice(openEnd + 1, closeStart);
    const isExternal = hasAttr(openTag, "src");
    const isEmptyInline = !isExternal && body.length === 0;

    scriptIdx += 1;

    if (isExternal || isEmptyInline) {
      // Keep as-is.
      out += html.slice(openStart, closeEnd);
      pos = closeEnd;
      manifest.extracted.push({
        index: scriptIdx,
        kind: isExternal ? "external" : "empty-inline",
        preserved: true,
      });
      continue;
    }

    const fileName = sanitizeName(chooseName(body, scriptIdx, usedNames));
    usedNames.add(fileName);
    const relPath = path.posix.join("js", fileName);
    const outPath = path.join(OUT_DIR, fileName);

    // Write body as-is (no extra banner), to minimize behavior risk.
    fs.writeFileSync(outPath, body, "utf8");

    // Preserve original attributes, just replace the body with src=... tag.
    // We keep any attributes (type, nomodule, async, etc.) except any existing src.
    // If there is an inline script with a src attr (rare), we would have treated it as external above.
    const openAttrs = openTag
      .slice("<script".length, -1)
      .trim();
    const newOpenTag = openAttrs.length
      ? `<script ${openAttrs} src="${relPath}">`
      : `<script src="${relPath}">`;

    out += `${newOpenTag}</script>`;

    manifest.extracted.push({
      index: scriptIdx,
      kind: "inline",
      output: relPath,
      bytes: Buffer.byteLength(body, "utf8"),
    });

    pos = closeEnd;
  }

  fs.writeFileSync(INDEX_HTML, out, "utf8");
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  const inlineCount = manifest.extracted.filter((e) => e.kind === "inline").length;
  console.log(`Done. Extracted ${inlineCount} inline scripts to ${path.relative(ROOT, OUT_DIR)}.`);
}

main();

