import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { minify } from 'html-minifier-terser';

// Plugin to inline CSS, JS, and minify HTML (single-file output)
function inlineAssetsAndMinifyHtml() {
  return {
    name: 'inline-assets-minify-html',
    enforce: 'post',
    async closeBundle() {
      const distDir = 'dist';
      const htmlPath = join(distDir, 'index.html');

      let html = readFileSync(htmlPath, 'utf-8');

      // Find and inline CSS files
      const cssRegex = /<link[^>]+href="([^"]+\.css)"[^>]*>/g;
      let match;
      while ((match = cssRegex.exec(html)) !== null) {
        const cssPath = join(distDir, match[1].replace(/^\//, ''));
        try {
          const css = readFileSync(cssPath, 'utf-8');
          html = html.replace(match[0], `<style>${css}</style>`);
          unlinkSync(cssPath);
        } catch (e) {
          console.warn(`Could not inline CSS: ${cssPath}`);
        }
      }

      // Find and inline JS files (module scripts)
      const jsRegex = /<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g;
      while ((match = jsRegex.exec(html)) !== null) {
        const jsPath = join(distDir, match[1].replace(/^\//, ''));
        try {
          const js = readFileSync(jsPath, 'utf-8');
          // Keep type="module" for ES module compatibility
          html = html.replace(match[0], `<script type="module">${js}</script>`);
          unlinkSync(jsPath);
        } catch (e) {
          console.warn(`Could not inline JS: ${jsPath}`);
        }
      }

      // Minify HTML (includes inlined CSS and JS)
      html = await minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      });

      writeFileSync(htmlPath, html);
      console.log('✓ CSS + JS inlined, HTML minified (single-file output)');
    }
  };
}

export default defineConfig({
  plugins: [inlineAssetsAndMinifyHtml()],
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_getters: true,
        unsafe: true,
        unsafe_math: true,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
