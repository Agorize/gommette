<template functional>
  <component
    :is="props.tag"
    :class="{
      'flex-row': props.flex,
      'row': !props.flex,
      [`justify-${props.justify}`] :props.flex && props.justify,
      [`align-${props.align}`]: props.flex && props.align,
    }"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'AgoRow',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    flex: Boolean,
    justify: String,
    align: String,
  },
}
</script>
