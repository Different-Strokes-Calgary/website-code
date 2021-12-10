import type { Options } from 'tsup'
import { baseTsup } from './tsup.base'

export const tsup: Options = {
  ...baseTsup,
  format: ['cjs', 'esm'],
  entryPoints: ['index.ts']
}
