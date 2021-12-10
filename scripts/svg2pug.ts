import * as andsvg from 'and-svg'
import fs from 'fs'

const inDir = 'Assets'
const outDir = 'Assets/pug'

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

andsvg.utils.convertSvgDirectory(inDir, outDir)
