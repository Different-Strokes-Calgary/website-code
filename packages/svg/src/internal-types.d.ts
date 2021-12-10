export type templateFunc = (localsObject: LocalsObject) => string

export interface LocalsObject {
  [propName: string]: any
}
