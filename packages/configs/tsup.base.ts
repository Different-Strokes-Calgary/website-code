import type { Options } from 'tsup'

export const baseTsup: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm'],
  minify: true
}
