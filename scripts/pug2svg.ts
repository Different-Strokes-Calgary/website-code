import * as dscSvg from '@dsc/svg'
import { NodePath } from '@dsc/utils'

const inDir = new NodePath('website/images')
const outDir = new NodePath('misc/svg')

await main()

async function pug2svg() {
  outDir.rm()
  outDir.makeDir()

  dscSvg.utils.convertTemplateDirectory(inDir, outDir)
}

async function main() {
  console.log(NodePath.moduleRoot('@dsc/svg'))
}
