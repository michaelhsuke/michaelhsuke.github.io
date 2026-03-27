import type { Plugin } from 'vite'

/**
 * VitePress doesn't expose virtual modules for UnoCSS to scan.
 * This plugin rewrites the .vitepress/theme/index.ts import
 * to allow UnoCSS to detect it.
 */
export function vitepressPluginRewrite(): Plugin {
  return {
    name: 'vitepress-plugin-rewrite',
    enforce: 'post',
    transform(code, id) {
      if (id.includes('vitepress/dist/client/app/index.js')) {
        return code.replace(
          /const __vpue_default_export__ = __vite_inject_style__\((.*?)\)/,
          'const __vpue_default_export__ = (await import("virtual:uno.css-preload")).default ?? $1'
        )
      }
    }
  }
}
