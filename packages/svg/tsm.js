// ESM syntax
import { define } from 'tsm/config'

export default define({
  common: {
    target: 'es2021',
    minify: false,
    treeShaking: false,
    sourcemap: 'inline'
  }

  /*'.ts': {
		minify: false,
	},

	'.html': {
		loader: 'text',
	},*/

  // ...
})
