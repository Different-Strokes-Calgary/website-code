declare module 'html2pug' {
  export type Options = {
    /** Use tabs instead of spaces for indentation
     *  @default false */
    tabs?: boolean
    /** Use commas to separate node attributes.
     * @default true */
    commas?: boolean
    /** Use double quotes instead of single quotes for attribute values.
     * @default false */
    doubleQuotes?: boolean
    /** Prevent `<html>` and `<body>` tags from being added.
     * @default false */
    fragment?: boolean
  }

  /** Convert html string to pug string */
  export default function html2pug(html: string, options?: Options): string
}
