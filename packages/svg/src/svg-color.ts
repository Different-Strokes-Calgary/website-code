type ColorLike = SvgColor | string | number[]

export class SvgColor {
  static Error = class SvgColorError extends Error {
    constructor(message: string) {
      super(`SvgColor Error: ${message}`)
    }
  }

  constructor(color: ColorLike)

  constructor(r: number, g: number, b: number, a?: number)

  constructor(value: ColorLike | number, g?: number, b?: number, a?: number) {
    if (Array.isArray(value)) this.components = <[number, number, number]>value.slice(0, 4)
    else if (typeof value === 'string') this.rgb = value
    else if (typeof value === 'number')
      this.components = <[number, number, number]>(
        [value, g, b, a].filter((value) => Boolean(value) || value == 0)
      )
    else if (value instanceof SvgColor) this.components = value.components
    else throw new SvgColor.Error(`Constructor got unknown input: ${JSON.stringify(value)}`)
  }

  protected _components?: [number, number, number, number]

  get components(): [number, number, number, number] {
    return this._components || [0, 0, 0, 255]
  }

  protected set components(value: [number, number, number] | [number, number, number, number]) {
    if (value.length >= 4) this._components = <[number, number, number, number]>value.slice(0, 4)
    else if (value.length == 3) this._components = [...value, 255]
    else throw new SvgColor.Error(`components must be 3 or 4 numbers, got ${JSON.stringify(value)}`)
  }

  get r(): number {
    return this.components[0]
  }

  protected set r(value) {
    this.components[0] = value
  }

  get g(): number {
    return this.components[1]
  }

  protected set g(value) {
    this.components[1] = value
  }

  get b(): number {
    return this.components[2]
  }

  protected set b(value) {
    this.components[2] = value
  }

  get a(): number {
    return this.components[3]
  }

  protected set a(value) {
    this.components[3] = value
  }

  get rgb(): string {
    return `#${this.components.slice(0, 3).map(SvgColor.toHex).join('')}`
  }

  protected set rgb(value) {
    let match: RegExpMatchArray | null
    const _value = value.replace(/\s/g, '')

    if (
      (match = _value.match(/^#([\da-f]{1,2})([\da-f]{1,2})([\da-f]{1,2})([\da-f]{1,2})?$/i)) &&
      match.length > 4
    ) {
      this.components = <[number, number, number]>(
        match.slice(1, 5).filter(Boolean).map(SvgColor.fromHex)
      )
    } else throw new SvgColor.Error(`not a valid svg hex color code, got ${value}`)
  }

  get rgba(): string {
    return `#${this.components.map(SvgColor.toHex).join('')}`
  }

  protected set rgba(value) {
    this.rgb = value
  }

  static toHex(num: number): string {
    if (num > 255) return 'ff'
    if (num < 0) return '00'
    return Math.round(Number(num)).toString(16).padStart(2, '0')
  }

  static fromHex(str: string): number {
    return parseInt(str, 16) * (str.length == 1 ? 16 : 1)
  }

  interpolateTo(color: ColorLike, ratio: number): SvgColor {
    const _color = new SvgColor(color)
    return new SvgColor(
      this.components.map((value, index) => value + ratio * (_color.components[index] - value))
    )
  }

  subtract(color: ColorLike): SvgColor {
    const _color = new SvgColor(color)
    return new SvgColor(this.components.map((value, index) => value - _color.components[index]))
  }

  add(color: ColorLike): SvgColor {
    const _color = new SvgColor(color)
    return new SvgColor(this.components.map((value, index) => value + _color.components[index]))
  }
}
