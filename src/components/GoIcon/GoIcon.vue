<template>
  <span
    class="go-icon"
    :class="`icn-${name}`"
    data-testid="icon"
  />
</template>

<script>
export default {
  name: 'GoIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<docs>
```js
  <go-icon name="info" />
```
</docs>
