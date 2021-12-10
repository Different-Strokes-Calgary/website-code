<svelte:options namespace="svg" />

<script context="module" lang="ts">
  /// <reference lib="dom" />
</script>

<template lang="pug">
  include $images/import_all
  script(lang='ts')
    | const svgSymbols =
    +svgMetadataJson
    |
    | export let name: string
    | export let title: string
    | export let inline = false
    | title = title || name

  +if('inline')
    +svg(display='none')
    +else
      +escapeReplaceBlock("restProps", "\x7B...$$restProps}")
        +svgUseBody("{name}", "{svgSymbols.body[name]?.args.width}", "{svgSymbols.body[name]?.args.height}")(
          restProps
        )
</template>
