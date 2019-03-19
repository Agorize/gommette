<template>
  <div class="go-banner">
    <div class="go-banner__inner">
      <slot />
      <button
        v-if="beClose"
        class="go-banner__close go-button"
        ref="go-banner__close"
        @click.prevent="$emit('closeBanner')"
      >
        <go-icon
          name="cross"
          class="xs"
        />
      </button>
    </div>
  </div>
</template>

<script>
import GoIcon from '@/components/GoIcon/GoIcon.vue'

export default {
  name: 'GoBanner',
  props: {
    beClose: {
      type: Boolean,
      default: false
    }
  },
  components: {
    GoIcon
  }
}
</script>

<docs>
```js
  <div>
    <go-banner>
      <p>The banner</p>
    </go-banner>
    <hr />
    <go-banner
      class="is-primary"
      :beClose="true"
    >
      <p>This banner can be close</p>
    </go-banner/>
  </div>
```
</docs>
