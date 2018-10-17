<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
/**
 * The only true button.
 */
export default {
  name: 'AgoButton',
  props: {
    /**
    * The color for the button.
    */
    color: {
      type: String,
      default: '#333'
    },
    /**
    * The size of the button
    * `small, normal, large`
    */
    size: {
      type: String,
      default: 'normal'
    },
    /**
    * Gets called when the user clicks on the button
    */
    onClick: {
      type:Function,
      default: (event) => {
        console.log('You have clicked me!', event.target);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
