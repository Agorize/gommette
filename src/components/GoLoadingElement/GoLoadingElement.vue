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

<style lang="scss">
@keyframes placeHolderShimmer {
  0% {
    background-position: 100% 0;
  }
  
  100% {
    background-position: -200% 0;
  }
 }

.loader-container {
  position: relative;
  width: 50%;
  height: 20px;
}

.animated-background {
  height: 100%;
  width: 100%;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 400% 100%;
 }
</style>

<docs>
  ## Basic loader element
  ```js
    <div>
      <GoLoadingElement></GoLoadingElement>
    </div>
  ```
</docs>
