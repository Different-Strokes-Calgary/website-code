import * as andsvg from 'and-svg'
import { NodePath } from '@dsc/utils'

const inDir = new NodePath('images')
const outDir = new NodePath('Assets/svg')

outDir.rm()
outDir.makeDir()

andsvg.utils.convertTemplateDirectory(inDir, outDir)
