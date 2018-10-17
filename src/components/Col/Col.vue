<template functional>
  <component
    :is="props.tag"
    :class="{
      'col': !props.xs && !props.sm && !props.md && !props.lg && !props.xl,
      [`col-xs-${props.xs}`]: props.xs,
      [`col-sm-${props.sm}`]: props.sm,
      [`col-md-${props.md}`]: props.md,
      [`col-lg-${props.lg}`]: props.lg,
      [`col-xl-${props.xl}`]: props.xl,
      [`offset-xs-${props.offsetXs}`]: props.offsetXs,
      [`offset-sm-${props.offsetSm}`]: props.offsetSm,
      [`offset-md-${props.offsetMd}`]: props.offsetMd,
      [`offset-lg-${props.offsetLg}`]: props.offsetLg,
      [`offset-xl-${props.offsetXl}`]: props.offsetXl,
    }"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'AgoCol',
  props: {
    /**
     * Tag of the dom object
     */
    tag: {
      type: [String, Number],
      default: 'div',
    },
    /**
     * Amount of columns from xs
     */
    xs: [String, Number],
    /**
     * Amount of columns from sm
     */
    sm: [String, Number],
    /**
     * Amount of columns from md
     */
    md: [String, Number],
    /**
     * Amount of columns from lg
     */
    lg: [String, Number],
    /**
     * Amount of columns from xl
     */
    xl: [String, Number],
    /**
     * Amount of offset from xs
     */
    offsetXs: [String, Number],
    /**
     * Amount of offset from sm
     */
    offsetSm: [String, Number],
    /**
     * Amount of offset from md
     */
    offsetMd: [String, Number],
    /**
     * Amount of offset from lg
     */
    offsetLg: [String, Number],
    /**
     * Amount of offset from xl
     */
    offsetXl: [String, Number]
  }
}
</script>

<docs>
```js
<ago-col>I’m a col</ago-col>
```
</docs>
