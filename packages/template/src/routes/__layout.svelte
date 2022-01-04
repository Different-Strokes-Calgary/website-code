<script lang="ts">
  import Divider from '$lib/Divider.svelte'
  import Footer from '$lib/Footer.svelte'
  import Svg from '$lib/Svg.svelte'
  import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'sveltestrap'
  import { pages } from '../lib/pages'
  import '../theme.scss'

  const pageNames = Object.keys(pages)
</script>

<Svg inline />

<Navbar dark expand="md">
  <NavbarBrand class="me-auto" href="/">
    <Svg name="Logo-in-Circle" style="--logo-background-color: #fff" width="32px" />
    <span class="collapse-title">Different Strokes Calgary</span>
  </NavbarBrand>
  <NavbarToggler class="me-2" id="nav-toggler" />

  <Collapse expand="md" navbar toggler="#nav-toggler">
    <Nav class="ms-auto" navbar>
      {#each pageNames as page}
        {#if page.toLowerCase() !== 'index'}
          <NavItem>
            <NavLink href="/{page}">{page}</NavLink>
          </NavItem>
        {/if}
      {/each}
    </Nav>
  </Collapse>
</Navbar>

<slot />

<Divider class='mt-2 mb-1' />

<Footer />

<style global lang="scss">
  @use 'bs/mixins' as bs;
  .navbar-brand {
    font-family: DSCLogo, monospace;
  }
  .collapse-title {
    display: none;
    @include bs.media-breakpoint-up(md) {
      display: revert;
    }
  }
</style>
