import { Path } from './path.js'
import type { PathLike } from './types.js'

type DirectoryJsonType = { [key: string]: DirectoryJsonType } & { '/': string[]; ' '?: string }

export class Directory {
  public name: string
  children: Record<string, Directory>
  files: Set<string>

  public constructor(serialized: DirectoryJsonType)
  public constructor(name: string, input?: PathLike[])
  public constructor(nameOrJson: string | DirectoryJsonType, input?: PathLike[]) {
    this.children = {}
    if (typeof nameOrJson === 'string') {
      this.name = nameOrJson
      this.files = new Set<string>()
      input = input || []
      for (const _item of input) {
        const item = Path.toFullName(_item)
        this.addDirs([Array.from(item.matchAll(/(?:^[/\\])?([^/\\]+)(?:[/\\])/g), (dir) => dir[1])])
        const file = item.match(/([^/\\]+$)/)?.[1]
        if (file) this.files.add(file)
      }
    } else if ('/' in nameOrJson) {
      this.files = new Set<string>(nameOrJson['/'])
      this.name = nameOrJson?.[' '] || ''

      for (const key in nameOrJson) {
        if (key !== '/' && key !== ' ') {
          this.children[key] = new Directory(nameOrJson[key])
        }
      }
    } else throw new Error('Directory constructor got unknown input.')
  }

  addDirs(dirs: string[] | string[][]): void {
    for (const dir of dirs) {
      let dirName: string
      let dirChildren: string[] | undefined
      if (Array.isArray(dir)) {
        if (dir.length == 0) continue
        dirName = dir[0]
        dirChildren = dir.slice(1)
      } else {
        dirName = dir
        dirChildren = undefined
      }
      if (!(dirName in this.children)) {
        this.children[dirName] = new Directory(dirName, dirChildren)
      }
    }
  }

  toJSON(): DirectoryJsonType {
    return Object.keys(this.children).reduce<DirectoryJsonType>(
      (mapObj, key) => {
        mapObj[key] = this.children[key].toJSON()
        return mapObj
      },
      <DirectoryJsonType>{ '/': Array.from(this.files), ' ': this.name }
    )
  }
}
