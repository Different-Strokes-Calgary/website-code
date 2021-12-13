import type { Options } from 'tsup'
import { baseTsup } from '@dsc/configs'

export const tsup: Options = {
  ...baseTsup,
  entryPoints: ['src/index.ts', 'src/node/index.ts']
}
