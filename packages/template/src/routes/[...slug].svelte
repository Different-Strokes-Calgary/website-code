<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { Directory, Path } from '@dsc/utils'
  import type { SvelteComponent } from 'svelte'
  import pages_md from '../lib/pages'

  export const load: Load = async (input) => {
    const slug = new Path(input.page.params['slug'])
    slug.cleanSlug(/html?/i, 'index')
    const pages = new Directory(input.session.pages)
    const importSlug = slug.toString()

    try {
      return {
        props: {
          PageContent: pages_md[importSlug],
          pages
        }
      }
    } catch {
      return undefined
    }
  }
</script>

<script lang="ts">
  export let PageContent: SvelteComponent
</script>

<svelte:component this={PageContent} />
