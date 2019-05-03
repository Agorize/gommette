<template>
  <div class="super-card m-b-md">
    <header v-if="$slots.cover">
      <!-- @slot Use this slot for the cover -->
      <slot name="cover" />
    </header>

    <go-card-cover
      v-if="!$slots.cover && cover"
      :img-url="cover.imgUrl"
      :card-path="cover.cardPath"
      :overlay="cover.overlay"
      :banner="cover.banner"
    />

    <div class="content bg-white">
      <!-- @slot Use this slot for the content of the card -->
      <slot />
    </div>
  </div>
</template>

<script>
import GoCardCover from './GoCardCover.vue'

export default {
  name: 'GoCard',
  props: {
    /**
    * Object for CardCover
    *
    * overlay: Object,
    * banner: Object
    **/
    cover: {
      type: Object,
      default: null
    }
  },
  components: {
    GoCardCover
  }
}
</script>

<docs>

  ## Basic card
  ```js
    <div>
      <go-card>
        <p>My default slot</p>
      </go-card>
    </div>
  ```

  ## Basic card with slot cover
  ```js
    <go-card>
      <template slot="cover">
        My slot Cover
      </template>
      <p>My default slot</p>
    </go-card>
  ```

  ## Basic card with cover prop
  ```js
    <go-card :cover="{}">
      <p>My default slot</p>
    </go-card>
  ```

  ## Card with cover prop containing imgUrl
  ```js
    <go-card :cover="{ imgUrl: 'http://placekitten.com/200/300' }">
      <p>My default slot</p>
    </go-card>
  ```

  ## Card with cover prop containing imgUrl and challengeSlug
  ```js
    <go-card :cover="{
        imgUrl: 'http://placekitten.com/200/300',
        cardPath: '/my-path'
      }"
    >
      <p>My default slot</p>
    </go-card>
  ```

  ## Card with cover prop containing overlay object with text and icon name
  ```js
    <go-card :cover="{
      overlay: {
        active: true,
        text: '1st place',
        iconName: 'trophy-simple'
      },
      imgUrl: 'http://placekitten.com/200/300',
    }">
      <p>My default slot</p>
    </go-card>
  ```

  ## Card with cover prop containing banner object with link and title
  ```js
    <go-card :cover="{
      banner: {
        active: true,
        title: 'You are admin of this challenge',
        url: 'my-url'
      }, imgUrl: 'http://placekitten.com/200/300'
    }">
      <p>My default slot</p>
    </go-card>
  ```

  ## Card with cover prop prop containing banner object with link
  ```js
    <go-card :cover="{
      banner: {
        active: true,
        title: 'You are participating to this challenge',
      }, imgUrl: 'http://placekitten.com/200/300'
    }">
      <p>My default slot</p>
    </go-card>
  ```
</docs>

