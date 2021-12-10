import fs from 'fs'
import html2pug from 'html2pug'
import svgo from 'svgo'
import { html2pugOptions, svgoOptions } from './config'
import type * as types from './internal-types'
import { templateForFile, templateForString } from './templates'

export class SvgTemplate {
  protected constructor(protected pugTemplate: string, protected pugFunction: types.templateFunc) {}

  public static fromTemplateFile(templateFile: string): SvgTemplate {
    const { templateString, templateFunc } = templateForFile(templateFile)
    return new SvgTemplate(templateString, templateFunc)
  }

  public static fromSvgFile(svgFile: string): SvgTemplate {
    const svgString = this.loadSvg(svgFile)
    const templateString = html2pug(svgString, html2pugOptions).replaceAll(
      /\s*space='preserve'\s*/g,
      ''
    )
    return new SvgTemplate(templateString, templateForString(svgFile, templateString))
  }

  public static fixSvg(fileName: string, svgString: string): string {
    return svgString
      .replaceAll(/(?<!:)href/g, 'xlink:href')
      .replace(/(?<=<svg)/, ' xmlns:xlink="http://www.w3.org/1999/xlink"')
      .replaceAll(/href="#/g, `href="${fileName}#`)
      .replaceAll(/url\(#/g, `url(${fileName}#`)
  }

  protected static loadSvg(svgFile: string): string {
    const svgString = fs.readFileSync(svgFile, 'utf8')
    const result = svgo.optimize(svgString, svgoOptions)
    return result.data
  }

  public toSvg(fileName: string, locals?: types.LocalsObject): string {
    locals = locals || {}
    const svgString = this.pugFunction(locals)

    const result = svgo.optimize(SvgTemplate.fixSvg(fileName, svgString), svgoOptions)
    return result.data
  }

  public toTemplate(): string {
    return this.pugTemplate
  }
}

export default SvgTemplate
