/**
 * Rename a URL.
 * Used to change links from `file.md` to `file`.
 */
import { visit } from 'unist-util-visit';
import { Transformer } from 'unified';
import { Node } from 'unist';
import { Definition, Link } from 'mdast';

type LinkNode = Definition | Link
const urlAbsRegex = /^(\/|[a-z]+:)/i

export default function rename(): Transformer {
  return (tree) => {
    visit(tree, ['link', 'definition'], (node: Node) => {
      const { url } = node as LinkNode
      (node as LinkNode).url = (urlAbsRegex.test(url) ? '' : '/') + url
        .replace(/\.md/, '')
    })
  }
}
