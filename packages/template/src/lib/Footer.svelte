<script lang="ts">
  import { Col, Container, Row } from 'sveltestrap'
  import { internalPages } from './pages'

  const FooterContent = internalPages['_footer']
</script>

<footer>
  <Container>
    <Row class="align-items-center">
      <Col sm="3">
        <span class="text-muted smaller">© 2021 Different Strokes Calgary</span>
      </Col>
      <Col class="justify-content-center d-flex">
        <span class="text-muted small"><FooterContent /></span>
      </Col>
      <Col class="corporate-icons justify-content-end d-flex" sm="3">
        <svg>
          <use xlink:href="/images.svg#Twitter" />
        </svg>
        <svg>
          <use xlink:href="/images.svg#Facebook" />
        </svg>
        <svg>
          <use xlink:href="/images.svg#Instagram" />
        </svg>
      </Col>
    </Row>
  </Container>
</footer>

<style lang="scss">
  // Make the footer content act as inline not block, unless Explicitly otherwise
  footer :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
