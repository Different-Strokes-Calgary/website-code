<script context="module">
  export {default as Divider} from '$lib/Divider.svelte'
</script>

<script>
  import { Container } from 'sveltestrap'
  import Divider from './Divider.svelte'
  import Svg from '$lib/Svg.svelte'

  /** @type {string} */
  export let banner
</script>

{#if banner?.length > 0}
  <Svg name={banner} />
  <Divider class='mb-2' />
{/if}

<Container>
  <slot />
</Container>
