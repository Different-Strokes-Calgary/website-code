import * as dscSvg from '@dsc/svg'
import { NodePath } from '@dsc/utils/node'

const inDir = NodePath.moduleRoot('@dsc/website').join('images')
const outDir = NodePath.moduleRoot('@dsc/misc').join('svg')

await main()

async function pug2svg() {
  outDir.rm()
  outDir.makeDir()

  dscSvg.utils.convertTemplateDirectory(inDir, outDir)
}

async function main() {
  await pug2svg()
}
