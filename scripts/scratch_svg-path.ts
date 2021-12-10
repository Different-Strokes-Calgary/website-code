// This is a constantly changing file for quick one-off transformations and commands!
import { SvgColor } from 'and-svg'
import svgPath from 'svgpath'

const wallColors = ['#1d1d1b', '#3d3d3c'].map((value) => new SvgColor(value))
const floorColors = ['#1f1f1d', '#333331'].map((value) => new SvgColor(value))
const rainbow = ['#e30613', '#f39200', '#ffed00', '#009640', '#1d70b8', '#662383'].map(
  (value) => new SvgColor(value)
)
const rainbowOffset = rainbow[2].subtract('#bdae00')

console.log(wallColors[0].interpolateTo(wallColors[1], (100 / (102 - 1)) * (381 / 413)).rgb)
console.log(floorColors[0].interpolateTo(floorColors[1], (100 - 93) / (134 - 93)).rgb)
console.log(Math.round(((413 * 0.93 - 381) / (413 - 381)) * 100))
console.log(rainbow.map((color) => color.subtract(rainbowOffset).rgb))

const pathData = `m 0 0 h 1`
const transforms = 'rotate(-90 550.667 4) scale(170.66666)'

const svgPathObj = svgPath(pathData)
  .scale(170.66666)
  .rotate(-90, 550.667, 4)
  .scale(100 / 1093, 100 / 413)
  .round(0)
  .abs()

console.log(svgPathObj.toString())
