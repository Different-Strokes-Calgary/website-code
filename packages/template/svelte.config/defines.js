import { lib_path, pages_path } from './paths.js'

const pages_list = Array.from(pages_path.recursiveDir(/\.md$/i))
export const file_list = [
  '/',
  '/schedule.ics',
  ...pages_list.map(
    (file) => file.relativeTo(pages_path).setExtension('').setRoot('/').setSeparator('/').fullName
  )
]
export const pages_names = pages_list.map((file) => [
  file.relativeTo(pages_path).fullName.replaceAll(/[\\. ]/gi, '_'),
  file.relativeTo(lib_path).setSeparator('/').fullName,
  file.relativeTo(pages_path).setExtension().fullName
])

export const mdsvex_extensions = ['.svelte.md', '.md', '.svx']
export const extensions = ['.svelte', ...mdsvex_extensions]
