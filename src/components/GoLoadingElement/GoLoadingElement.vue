<template>
  <component 
    :is="tag"
    class="loader-container"
  > 
    <div class="animated-background"></div>
  </component>
</template>

<script>
export default {
  name: 'GoLoadingElement',
  props: {
    tag: {
      default: 'div',
      type: String
    }
  }
}
</script>

<docs>
  ## Basic loader element
  ```js
    <div>
      <GoLoadingElement></GoLoadingElement>
    </div>
  ```
</docs>
