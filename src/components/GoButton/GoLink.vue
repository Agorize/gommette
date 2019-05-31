<template functional>
  <a
    :class="{
      [props.variant]: Boolean(props.variant)
    }"
    :href="props.href"
    :target="props.target">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'GoLink',
  props: {
    variant: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: '#'
    },
    target: {
      type: String,
      default: '_self'
    }
  }
}
</script>

<docs>
```js
<go-link>
  I’m a link
</go-link>
```

```js
<go-link href="#/Components/GoLink" target="_blank">
  I’m a link opening in a new tab
</go-link>
```
</docs>
