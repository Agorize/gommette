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
    /**
     * Tag of the dom object
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Activate flex mode
     */
    flex: Boolean,
    /**
     * start | center | end (flex mode only)
     */
    justify: String,
    /**
     * start | center | end (flex mode only)
     */
    align: String,
  }
}
</script>

<docs>
```js
<AgoRow>
  <AgoCol>I’m a col</AgoCol>
</AgoRow>
```
</docs>
