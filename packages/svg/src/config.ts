import type * as html2pug from 'html2pug'
import type pug from 'pug'
import type svgo from 'svgo'

export const svgoOptions: svgo.OptimizeOptions = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIDs: {
            remove: true
          },
          cleanupNumericValues: {
            floatPrecision: 0
          },
          convertPathData: {
            floatPrecision: 1
          }
        }
      }
    },
    { name: 'cleanupListOfValues', params: { floatPrecision: 0 } },
    { name: 'reusePaths' },
    { name: 'convertStyleToAttrs' },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['version', '.*:space']
      }
    },
    { name: 'removeDimensions' }
  ]
}
export const svgoPrettyOptions: svgo.OptimizeOptions = {
  js2svg: {
    pretty: true,
    indent: 2
  }
}
export const pugOptions: pug.Options = {
  self: true
}

export const html2pugOptions: html2pug.Options = {
  commas: false,
  fragment: true
}
