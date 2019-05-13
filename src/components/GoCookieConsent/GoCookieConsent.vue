<template>
  <transition name="fade">
    <div
      class="cookie-consent"
      ref="cookie-consent"
      v-show="open"
    >
      <div class="cookie-consent__content">
        <slot name="content">
          <p
            class="text-white m-r-xs"
            v-html="textContent"
          />
          <button
            @click="onClose"
            class="go-button tabindex-white"
            ref="close-button"
          >
            <GoIcon
              name="close"
              class="text-white"
            />
          </button>
        </slot>
      </div>
      <div class="cookie-consent__actions-buttons m-t-md">
        <slot name="actions-buttons">
          <a
            v-if="privacyData.label"
            :href="privacyData.url"
            :title="privacyData.label"
            target="_blank"
            class="text-white text-underline tabindex-white"
          >
            {{ privacyData.label }}
          </a>
          <button
            class="btn btn-sm btn-inverse tabindex-white m-l-md"
            @click="onClick"
            ref="accept-button"
          >
            {{ acceptLabel }}
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'GoCookieConsent',
  props: {
    /**
    * text content use in cookie banner
    **/
    textContent: {
      type: String,
      required: true,
    },
    /**
    * text label use in accept button
    **/
    acceptLabel: {
      type: String,
      required: true,
    },
    /**
    * privacy data with url and label key use in privacy link
    * {
    * url: String,
    * label: String
    * }
    **/
    privacyData: {
      type: Object,
      default: () => ({}),
    },
    /**
    * offset height to set value when banner is set to absolute position
    **/
    offsetHeight: {
      default: -100,
      type: Number,
    },
    /**
    * Default state if banner is opened or not
    **/
    openBanner: {
      default: true,
      type: Boolean,
    }
  },
  data () {
    return {
      open: this.openBanner,
      cookieConsentElement: this.$refs['cookie-consent'],
      debounceCheckOffset: {},
    }
  },
  mounted () {
    this.checkNewOffset()
    this.debounceCheckOffset = debounce(this.checkNewOffset, 500)
    this.debounceCheckOffset()

    window.addEventListener('scroll', this.checkOffset)
    window.addEventListener('resize', this.debounceCheckOffset)
  },
  beforeDestroy () {
    this.removeListener()
  },
  methods: {
    onClick () {
      this.$emit('accept')
      this.closeCookieConsent()
    },
    onClose () {
      this.$emit('onClose')
      this.closeCookieConsent()
    },
    closeCookieConsent () {
      this.removeListener()
      this.open = false
    },
    checkOffset () {
      this.cookieConsentElement = this.$refs['cookie-consent']
      const stylePosition = this.cookieConsentElement.style.position

      // window height scroll is more than offset limit, cookie consent should be not fixed
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - this.offsetHeight) {
        this.cookieConsentElement.style.position = 'absolute'
      } else if (stylePosition !== 'fixed') {
        this.cookieConsentElement.style.position = 'fixed'
      }
    },
    checkNewOffset () {
      this.checkOffset()
    },
    removeListener () {
      window.removeEventListener('scroll', this.checkOffset)
      window.removeEventListener('resize', this.debounceCheckOffset)
    },
  },
}
</script>

<docs>
```js
  const text = `By continuing to browse this site or clicking on “Accept”, you agree to the use of
        cookies or other tracking devices to improve site navigation, analyze site usage, and
        support our marketing efforts. Click here to choose the type of cookies that are
        setup on your device.`
  const labelAccept = 'Accepter'

  <div>
    <go-cookie-consent
      :textContent="text"
      :acceptLabel="labelAccept"
      :privacyData="{url: 'master.agorize.com', label: 'Our privacy content'}"
    />
  </div>
````
</docs>
