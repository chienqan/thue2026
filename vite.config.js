import { defineConfig } from 'vite';

// Plugin to inject CSS preload hints
function cssPreloadPlugin() {
  return {
    name: 'css-preload',
    transformIndexHtml(html, ctx) {
      // Only in build mode
      if (!ctx.bundle) return html;

      // Find CSS files in bundle
      const cssFiles = Object.keys(ctx.bundle).filter(f => f.endsWith('.css'));

      // Generate preload tags
      const preloads = cssFiles.map(file =>
        `<link rel="preload" href="/${file}" as="style">`
      ).join('\n  ');

      // Inject after <head>
      return html.replace('<head>', '<head>\n  ' + preloads);
    }
  };
}

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [cssPreloadPlugin()],
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
      },
      mangle: {
        toplevel: true,
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
