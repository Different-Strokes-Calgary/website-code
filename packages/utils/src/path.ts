import type * as url from 'url'
import type { PathLike } from './types.js'

class PathError extends Error {
  constructor(message: string) {
    super(`Path error: ${message}`)
  }
}

export class Path {
  static separator = '/'

  constructor(path: PathLike) {
    if (typeof path === 'object')
      if ('pathname' in path) path = this.fileURLToPath(path)
      else if ('fullName' in path) path = path.fullName
      else throw new PathError('Constructor: unknown object type.')
    else path = path.toString()

    if (path && path.length > 0) {
      this.root = path.match(/^([/\\]?(?:[a-zA-Z]:[/\\])?)/)?.[1] || ''
      if (this.root) path = path.replace(/^([/\\]?(?:[a-zA-Z]:[/\\])?)/, '')
      const parsed = path.match(/^(?:(.*)[/\\])?([^/\\]+)[/\\]?$/)
      if (!parsed) throw new PathError(`Cannot parse '${path}'`)
      this.path = parsed?.[1]
      this.name = parsed[2].match(/^([^.]*)(?:\.|$)/)?.[1] || ''
      this.extensions = parsed[2].match(/^[^.]*\.(.*)$/)?.[1]
    }
  }

  protected static _separatorMatch = /[/\\]/g

  static get separatorMatch(): RegExp {
    this._separatorMatch.lastIndex = 0
    return this._separatorMatch
  }

  _separator?: string

  get separator(): string {
    return this._separator ? this._separator : Path.separator
  }

  protected set separator(value: string | undefined) {
    this._separator = value ? value : undefined
  }

  protected _name?: string

  get name(): string {
    return this._name ? this._name : ''
  }

  protected set name(value: string | undefined) {
    this._name = value ? value : undefined
  }

  protected _root?: string

  get root(): string {
    return this._root ? this.replaceSeparator(this._root) : ''
  }

  protected set root(value: string | undefined) {
    this._root = value ? value : undefined
  }

  get isAbsolute(): boolean {
    return !!this._root
  }

  get isRelative(): boolean {
    return !this._root
  }

  protected _path?: string[]

  get path(): string[] {
    return this._path ? this._path : []
  }

  protected set path(value: string[] | string | undefined) {
    if (!value) this._path = undefined
    else if (Array.isArray(value)) this._path = value
    else this._path = value.split(/[/\\]/g).filter((element) => element && element.length > 0)
  }

  protected _extensions?: string[]

  get extensions(): string[] {
    return this._extensions ? this._extensions : []
  }

  protected set extensions(value: string[] | string | undefined) {
    if (!value) this._extensions = undefined
    else if (Array.isArray(value)) this._extensions = value
    else this._extensions = value.split('.')
  }

  get extension(): string {
    return this.extensions.length > 0 ? this.extensions[this.extensions.length - 1] : ''
  }

  protected set extension(value: string | undefined) {
    if (value && value.length > 0)
      this.extensions[this.extensions.length ? this.extensions.length - 1 : 0] = value
    else this.extensions = this.extensions.slice(0, -1)
  }

  get base(): string {
    return [this.name, ...this.extensions].join('.')
  }

  protected set base(value: string | undefined) {
    if (value) {
      const parts = value.split('.')
      this.name = parts[0]
      this.extensions = parts.slice(1)
    } else {
      this.name = undefined
      this.extensions = undefined
    }
  }

  get parent(): this {
    const path = this.clone()
    path.path = this.path.slice(0, -1)
    if (this.base) path.base = this.path[this.path.length-1]
    return path
  }

  get isEmpty(): boolean {
    return this.name.length == 0 && this.path.length == 0 && this.extensions.length == 0
  }

  get fullName(): string {
    return this.toString()
  }

  static toFullName(path: PathLike): string {
    return new Path(path).fullName
  }

  replaceSeparator(value: string): string {
    return value.replaceAll(Path.separatorMatch, this.separator)
  }

  setBase(value?: string) {
    const path = this.clone()
    path.base = value
    return path
  }

  setName(value?: string): this {
    const path = this.clone()
    path.name = value
    return path
  }

  join(...segments: string[]): this {
    return this.clone([this.fullName, ...segments].join(this.separator))
  }

  setSeparator(separator: string): this {
    const path = this.clone()
    path.separator = separator
    return path
  }

  isExtension(extension: string, caseSensitive?: boolean): boolean {
    return caseSensitive
      ? extension === this.extension
      : extension.toLowerCase() === this.extension.toLowerCase()
  }

  hasExtension(extension: string, caseSensitive?: boolean): boolean {
    return caseSensitive
      ? this.extensions.includes(extension)
      : this.extensions.map((ext) => ext.toLowerCase()).includes(extension.toLowerCase())
  }

  setExtension(value?: string): this {
    const path = this.clone()
    path.extension = value
    return path
  }

  setExtensions(value?: string[] | string): this {
    const path = this.clone()
    path.extensions = value
    return path
  }

  setPath(value?: string[] | string): this {
    const path = this.clone()
    path.path = value
    return path
  }

  setRoot(value?: string): this {
    const path = this.clone()
    path.root = value
    return path
  }

  clone(fullName?: string): this {
    const path = new (<new (s: string) => this>this.constructor)(
      fullName ? fullName : this.fullName
    )
    path._separator = this._separator
    return path
  }

  fileURLToPath(path: url.URL): string {
    // FIXME: Naive implementation
    return path.pathname
  }

  toString(): string {
    return this.root + [...this.path, this.base].join(this.separator)
  }

  toJSON(): string {
    return this.toString()
  }

  cleanSlug(removeExt: string | RegExp, defaultName: string) {
    // Note: recursive from right eg. 'html' will remove all of: '.html.html.html'
    while (this.extension.match(removeExt)) {
      this.extension = ''
    }
    if (!this.name) this.name = defaultName
    return this.fullName
  }
}
