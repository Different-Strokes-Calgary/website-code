import { ArrayReplacement, Directory, NodePath, Replacers, ViteReplacement } from '$self'

export const replacers: Replacers = {
  DirListingReplacer: {
    from: /['"]@dirListing\(([^)]+)\)['"]/g,
    to: (_match, directory: string) => {
      const path = new NodePath(directory)
      const file_list = Array.from(path.recursiveDir(), (file) => file.relativeTo(path))
      const dir = new Directory(directory, file_list)
      return JSON.stringify(dir)
    }
  }
}

export function getFiltered(keys: string[]): Replacers {
  const entries = Object.entries(replacers).filter(([key]) => keys.includes(key))
  return Object.fromEntries(entries)
}

export function getAsViteReplacements(keys?: string[]): ViteReplacement[] {
  const result = keys ? getFiltered(keys) : replacers
  return Object.values(result)
}

export function getAsArrayReplacements(keys?: string[]): ArrayReplacement[] {
  return getAsViteReplacements(keys).map((viteReplacement) => [
    viteReplacement.from,
    viteReplacement.to
  ])
}
