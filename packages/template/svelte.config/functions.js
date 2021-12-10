import { lib_path } from './paths.js'
import { pages_names } from './defines.js'

export function generatePagesFile() {
  lib_path.join('pages.ts').writeFile(`
${pages_names
    .map(
      (file) => `// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ${file[0]} from ${JSON.stringify(file[1]).replaceAll('"', '\'')}`
    )
    .join('\n')}

export const pages = {
${pages_names
    .filter((file) => !file[2].startsWith('_'))
    .map((file) => `  '${file[2]}': ${file[0]}`)
    .join(',\n')}
}

export const internalPages = {
${pages_names
    .filter((file) => file[2].startsWith('_'))
    .map((file) => `  '${file[2]}': ${file[0]}`)
    .join(',\n')}
}

export default pages
`)
}


