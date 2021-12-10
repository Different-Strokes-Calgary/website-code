import type { URL } from 'node:url'
import type { Path } from './path.js'

export interface ParsedPath {
  root: string
  dir: string
  base: string
  ext: string
  name: string
}

export type PathLike = string | Buffer | URL | Path

export function isParsedPath(object: unknown): object is ParsedPath {
  const obj = <Record<string, unknown>>object
  return 'root' in obj && 'dir' in obj
}

/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
// I'd import it, but it isn't exported!

export type ReplacementFrom = string | RegExp
export type ReplacementTo = string | StringReplacer

export interface ViteReplacement {
  from: ReplacementFrom
  to: ReplacementTo
}

export type ArrayReplacement = [ReplacementFrom, ReplacementTo]

export interface StringReplacer {
  (substring: string, ...args: any[]): string
}

export interface Replacers {
  [key: string]: ViteReplacement
}
