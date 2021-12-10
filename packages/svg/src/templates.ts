import fs from 'fs'
import pug from 'pug'
import svgo from 'svgo'
import { pugOptions, svgoOptions, svgoPrettyOptions } from './config'
import type * as types from './internal-types'

export function templateForString(
  templateFile: string,
  templateString: string,
  pretty?: boolean,
  nonSvg?: boolean
) {
  const pugFunc = pug.compile(templateString, { ...pugOptions, filename: templateFile })
  const svgoOpts = pretty
    ? { ...svgoOptions, path: templateFile }
    : { ...svgoOptions, ...svgoPrettyOptions, path: templateFile }

  const svgoFunc: types.templateFunc = (locals) => {
    const svgString = pugFunc(locals)
    return svgo.optimize(svgString, svgoOpts).data
  }

  return nonSvg ? pugFunc : svgoFunc
}

export function templateForFile(templateFile: string, pretty?: boolean, nonSvg?: boolean) {
  const templateString = fs.readFileSync(templateFile, { encoding: 'utf8' })
  return {
    templateString,
    templateFunc: templateForString(templateFile, templateString, pretty, nonSvg)
  }
}
