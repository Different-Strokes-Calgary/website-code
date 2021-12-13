import type { PathLike } from '@dsc/utils/node'
import * as utils from '@dsc/utils/node'
import SvgTemplate from './svg-template'
import { templateForFile } from './templates'

export function convertSvgDirectory(source: PathLike, destination: PathLike): void {
  const destPath = new utils.NodePath(destination)
  const sourcePath = new utils.NodePath(source)
  destPath.makeDir()
  for (const entry of sourcePath.recursiveDir()) {
    if (entry.isExtension('svg')) {
      const entryTemplate = SvgTemplate.fromSvgFile(entry.fullName)
      destPath
        .join(entry.relativeTo(sourcePath).setExtensions(['svg', 'pug']).fullName)
        .writeFile(entryTemplate.toTemplate())
    }
  }
}

export function convertTemplateDirectory(source: PathLike, destination: PathLike): void {
  const destPath = new utils.NodePath(destination)
  const sourcePath = new utils.NodePath(source)
  destPath.makeDir()
  for (const entry of sourcePath.recursiveDir()) {
    if (entry.isExtension('pug') && entry.extensions.length > 1) {
      const targetFile = destPath.join(entry.relativeTo(sourcePath).setExtension().fullName)
      if (entry.hasExtension('svg')) {
        const entryTemplate = SvgTemplate.fromTemplateFile(entry.fullName)
        const svgOutput = entryTemplate.toSvg(targetFile.base)
        targetFile.parent.makeDir()
        targetFile.writeFile(svgOutput)
      } else {
        const { templateFunc } = templateForFile(entry.fullName, true, true)
        targetFile.parent.makeDir()
        targetFile.writeFile(templateFunc({}))
      }
    }
  }
}
