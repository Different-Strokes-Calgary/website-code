import { images_path, pages_path, project_path } from './paths.js'
import { replaceCodePlugin } from 'vite-plugin-replace'
import { replacer } from '@dsc/utils/node'

export const viteConfig = {
  resolve: {
    alias: {
      $pages: pages_path.fullName,
      $images: images_path.fullName
    }
  },
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /(?<!\w)\$images/gm,
          to: () => images_path.relativeTo(project_path).setSeparator('/').fullName
        },
        {
          from: /(?<!\w)\$pages/gm,
          to: () => pages_path.relativeTo(project_path).setSeparator('/').fullName
        },
        ...replacer.getAsViteReplacements()
      ]
    })
  ],
  server: {
    fs: {
      allow: ['.']
    }
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        preserveModules: false
      }
    }
  }
}
