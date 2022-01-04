import preprocess from 'svelte-preprocess'
import { replacer } from '@dsc/utils/node'
import { images_path, lib_path, pages_path, workspace_path } from './paths.js'
import { parse } from 'svelte/compiler'
import fs from 'fs'
import autoprefixer from 'autoprefixer'
import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import remarkRedirect from 'remark-redirect'
import { extensions, mdsvex_extensions } from './defines.js'

/** @type {import('svelte/types/compiler/preprocess').PreprocessorGroup[]} */
export const preprocessConfig = [
  preprocess({
    aliases: [mdsvex_extensions.map((value) => [value.slice(1), 'mdsvex'])],
    replace: [
      ...replacer.getAsArrayReplacements(),
      [
        /(?<!\w)\$images/gm,
        () => '/' + images_path.relativeTo(workspace_path).setSeparator('/').fullName
      ],
      [
        /(?<!\w)\$pages/gm,
        () => '/' + pages_path.relativeTo(workspace_path).setSeparator('/').fullName
      ]
    ],
    pug: {
      basedir: workspace_path.fullName
    },
    postcss: {
      plugins: [autoprefixer()]
    },
    scss: {
      renderSync: true,
      includePaths: [lib_path.fullName]
    },
    mdsvex: mdsvex({
      extensions: extensions,
      layout: './src/lib/MDLayout.svelte',
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkRedirect, remarkGfm, remarkEmoji]
    })
  }),
  mdsvex({
    extensions: mdsvex_extensions,
    layout: './src/lib/MDLayout.svelte',
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkRedirect, remarkGfm, remarkEmoji]
  }),
  preprocess.replace([
    [
      /^\s+import\s+Layout_MDSVEX_DEFAULT, \* as Components from '([^']+)'/gim,
      (match, layoutPath) => {
        return `${match};\n\timport ${injectComponents(layoutPath)} from '${layoutPath}'`
      }
    ]
  ])
]

function injectComponents(layoutPath) {
  const layout = fs.readFileSync(layoutPath, { encoding: 'utf8' })
  const ast = parse(layout)
  const component_exports = ast?.module?.content?.body?.filter(
    (node) => node.type === 'ExportNamedDeclaration'
  )
  const components = []
  if (component_exports.length) {
    for (let i = 0; i < component_exports.length; i++) {
      if (component_exports[i].specifiers && component_exports[i].specifiers.length) {
        for (let j = 0; j < component_exports[i].specifiers.length; j++) {
          components.push(component_exports[i].specifiers[j].exported.name)
        }
        //@ts-ignore
      } else if (component_exports[i].declaration.declarations) {
        //@ts-ignore
        const declarations = component_exports[i].declaration.declarations

        for (let j = 0; j < declarations.length; j++) {
          components.push(declarations[j].id.name)
        }
      } else if (component_exports[i].declaration) {
        components.push(
          //@ts-ignore
          component_exports[i].declaration.id.name
        )
      }
    }
  }
  const customComponents = components.filter((component) => {
    const character = component[0]
    return character !== character.toLowerCase() && character === character.toUpperCase()
  })
  const result = `{${customComponents.join(', ')}}`
  return customComponents.length ? result : ''
}
