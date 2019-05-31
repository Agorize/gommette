<template functional>
  <button
    :class="{
      [props.variant]: Boolean(props.variant)
    }"
    :disabled="props.disabled"
    :type="props.type"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'GoButton',
  props: {
    variant: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<docs>
```js
<go-button>
  I’m a button
</go-button>
```

```js
<go-button variant="btn">
  I’m a button with css variant
</go-button>
```

```js
<go-button :disabled="true" variant="btn">
  I’m a disabled button
</go-button>
```

```js
<go-button type="sumbit" variant="btn">
  I’m a submit button
</go-button>
```
</docs>
