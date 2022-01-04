import adapterStatic from '@sveltejs/adapter-static'
import { replacer } from '@dsc/utils/node'
import { replaceCodePlugin } from 'vite-plugin-replace'
import {
  images_path,
  pages_path,
  project_path,
  website_path
} from '@dsc/template/svelte.config/paths.js'
import { extensions, file_list } from '@dsc/template/svelte.config/defines.js'
import { generatePagesFile } from '@dsc/template/svelte.config/functions.js'
import { preprocessConfig } from '@dsc/template/svelte.config/preprocess.js'
import { viteConfig } from '@dsc/template/svelte.config/vite.js'

generatePagesFile()

/** @type {import('svelte/types/compiler/interfaces').CompileOptions} */
const svelteCompilerOptions = {
  css: false
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  amp: false, // Just in case, we really want our css emitted
  compilerOptions: svelteCompilerOptions,
  preprocess: preprocessConfig,
  extensions: extensions,

  kit: {
    target: '#svelte',
    prerender: {
      crawl: true,
      entries: file_list
    },

    files: {
      assets: website_path.join('assets').resolved.fullName
    },

    adapter: adapterStatic({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    
    trailingSlash: 'always',

    vite: viteConfig
  }
}

export default config
