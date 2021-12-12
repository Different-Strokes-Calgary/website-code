import fs from 'fs'
import node_fs from 'fs'
import path from 'path'
import node_path from 'path'
import URL from 'url'
import { createRequire } from 'module'
import { Path } from './path.js'
import type { PathLike } from './types.js'

export class NodePath extends Path {
  constructor(path: PathLike) {
    super(NodePath.smartResolve(path))
    this.separator = node_path.sep
  }

  get resolved(): this {
    return this.clone(node_path.resolve(this.fullName))
  }

  get exists(): boolean {
    return node_fs.existsSync(this.fullName)
  }

  get isDir(): boolean {
    return this.exists && node_fs.lstatSync(this.fullName).isDirectory()
  }

  get isFile(): boolean {
    return this.exists && node_fs.lstatSync(this.fullName).isFile()
  }

  protected static smartResolve(path: PathLike): PathLike {
    if (typeof path === 'object')
      if ('pathname' in path) path = URL.fileURLToPath(path)
      else if ('fullName' in path) path = path.fullName
      else throw new Error('Constructor: unknown object type.')
    else path = path.toString()
    return path
  }

  makeDir(): void {
    if (this.exists) {
      if (!this.isDir) throw new Error('Path exists but is not a directory.')
    } else node_fs.mkdirSync(this.fullName, { recursive: true })
  }

  writeFile(contents: string | NodeJS.ArrayBufferView): void {
    node_fs.writeFileSync(this.fullName, contents)
  }

  relativeTo(target: PathLike): this {
    const path = this.clone(node_path.relative(Path.toFullName(target), this.fullName))
    return path
  }

  rm(): void {
    node_fs.rmSync(this.fullName, { recursive: true, force: true })
  }

  *recursiveDir(match?: RegExp): Generator<this> {
    const dir = fs.opendirSync(this.fullName)
    let entry: fs.Dirent | null

    do {
      entry = dir.readSync()
      if (entry) {
        const entryPath = this.clone(path.join(this.fullName, entry.name))
        if (entry.isDirectory()) yield* entryPath.recursiveDir()
        else {
          if (!match || (match && match.test(entryPath.fullName))) yield entryPath
        }
      }
    } while (entry)
  }

  static moduleRoot(moduleName: string): NodePath {
    const require = createRequire(import.meta.url)
    const pathName = require.resolve(moduleName)
    return new NodePath(pathName)
  }
}
