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
    tag: {
      type: [String, Number],
      default: 'div',
    },
    xs: [String, Number],
    sm: [String, Number],
    md: [String, Number],
    lg: [String, Number],
    xl: [String, Number],
    offsetXs: [String, Number],
    offsetSm: [String, Number],
    offsetMd: [String, Number],
    offsetLg: [String, Number],
    offsetXl: [String, Number],
    justify: String,
    align: String,
  }
}
</script>
