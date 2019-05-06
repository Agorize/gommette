<template>
  <header
    class="bg thumbnail m-b-none"
    :style="{'background-image': `url('${imgUrl}')`}"
  >

    <div
      class="overlay"
      v-if="overlay.active"
    >
      <go-icon
        v-if="overlay.iconName"
        :name="overlay.iconName"
      />
      {{ overlay.text }}
    </div>

    <div
      v-if="banner.active"
      class="banner content-sm"
      :style="{'background-color': `#${banner.backgroundColorHexa}` }"
    >
      <a
        v-if="banner.url"
        :href="banner.url"
        class="text-white"
      >
        <u>{{ banner.title }}</u>
      </a>

      <template v-else>
        {{ banner.title }}
      </template>
    </div>
  </header>
</template>

<script>
import GoIcon from '@/components/GoIcon/GoIcon.vue'

export default {
  name: 'GoCardCover',
  props: {
    /**
    * Image url of the cover
    **/
    imgUrl: {
      type: String,
      default: ''
    },
    /**
    * Overlay with properties
    * {
    *   active: Boolean,
    *   iconName: String,
    *   text: String
    * }
    */
    overlay: {
      type: Object,
      default: () => ({})
    },
    /**
    *  Banner with properties
    * {
    *   active: Boolean,
    *   backgroundColorHexa: String,
    *   url: String,
    *   title: String
    * }
    */
    banner: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    GoIcon
  }
}
</script>

<style lang="scss" scoped>
  .bg {
    position: relative;
    height: 200px;
    background-position: center;
    background-size: cover;
  }
  .overlay {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(black, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .banner {
    position: absolute;
    z-index: 15;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    color: white;
  }
</style>

<docs>

## Basic cover
```js
  <go-card-cover
    img-url="http://placekitten.com/200/300"
  />
```

## Cover with overlay prop
```js
  <go-card-cover
    img-url="http://placekitten.com/200/300"
    :overlay="{
      active: true,
      text: '1st place',
      iconName: 'trophy-simple'
    }"
  />
```

## Cover with banner prop containing title and link
```js
  <go-card-cover
    img-url="http://placekitten.com/200/300"
    :banner="{
      active: true,
      title: 'You are admin of this challenge',
      url: 'my-url'
    }"
  />
```

## Cover with banner prop containing only title
```js
  <go-card-cover
    img-url="http://placekitten.com/200/300"
    :banner="{
      active: true,
      title: 'You are participating to this challenge'
    }"
  />
```

</docs>
