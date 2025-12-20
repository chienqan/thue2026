/**
 * Post-build script to inject preload hints for CSS files
 * Adds <link rel="preload"> for CSS to eliminate request chain
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const assetsDir = join(distDir, 'assets');
const htmlPath = join(distDir, 'index.html');

// Find CSS file
const files = readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));

if (!cssFile) {
  console.log('No CSS file found');
  process.exit(0);
}

// Read HTML
let html = readFileSync(htmlPath, 'utf-8');

// Check if preload already exists
if (html.includes(`preload" href="/assets/${cssFile}"`)) {
  console.log('CSS preload already exists');
  process.exit(0);
}

// Inject preload hint after <head>
const preloadTag = `\n  <link rel="preload" href="/assets/${cssFile}" as="style">`;
html = html.replace('<head>', '<head>' + preloadTag);

writeFileSync(htmlPath, html);
console.log(`Injected preload for ${cssFile}`);
