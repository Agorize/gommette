<template functional>
  <component
    :is="props.tag"
    class="btn"
    :class="{
      [props.variant]: Boolean(props.variant),
      link: Boolean(props.href)
    }"
    :disabled="props.disabled"
    :type="props.type"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'AgoButton',
  props: {
    /**
     * Tag of the dom object
     */
    tag: {
      type: String,
      default: 'button'
    },
    /**
     * Color variant
     */
    variant: {
      type: String,
      default: null
    },
    /**
     * Button size
     */
    size: {
      type: String,
      default: null
    },
    /**
     * Vue router "router-link" options
     */
    to: {
      type: [String, Object],
      default: null
    },
    /**
     * Link href
     */
    href: {
      type: String,
      default: null
    },
    /**
     * Link target
     */
    target: {
      type: String,
      default: '_blank'
    },
    /**
     * Disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Button type
     */
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<docs>
```js
<ago-button>
  I’m a button
</ago-button>
```

```js
<ago-button variant="brand">
  I’m a button
</ago-button>
```
</docs>
