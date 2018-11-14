---
to: "src/components/<%= needFolderName ? componentName : folderName %>/<%= componentName %>.vue"
unless_exists: true
---
<template>
  <div>

  </div>
</template>

<script>
export default {
  name: '<%= componentName %>'
}
</script>

<style lang="scss">

</style>

<docs>

</docs>
