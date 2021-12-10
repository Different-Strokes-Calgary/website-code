<script lang="ts">
  $$restProps['class'] = "content-divider " + ($$restProps['class'] || '')
</script>

<div class="content-divider" {...$$restProps}></div>

<style lang="scss">
  @use 'bs/mixins' as bs;

  .content-divider {
    @include bs.rfs(3rem, height);
    background-color: rgba(0, 0, 0, 0.1);
    border: solid rgba(0, 0, 0, 0.15);
    border-width: 1px 0;
    box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
  }
</style>
