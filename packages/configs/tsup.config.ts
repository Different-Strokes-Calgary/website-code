import type { Options } from 'tsup'
import { baseTsup } from './tsup.base'

export const tsup: Options = {
  ...baseTsup,
  entryPoints: ['index.ts']
}
