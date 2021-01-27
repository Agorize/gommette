<template>
  <transition name="fade">
    <div
      class="cookie-consent"
      ref="cookie-consent"
      v-show="open"
    >
      <div class="cookie-consent__content">
        <slot name="content">
          <div>
            <p
              v-if="isVueComponent"
              class="text-white m-r-xs"
            >
              <component :is="bodyContent" />
            </p>
            <p
              v-else
              class="text-white m-r-xs"
              v-html="bodyContent"
            />
            <CollapseTransition :duration="350">
              <div v-show="!!checkboxList.length && isOpenList">
                <div class="cookie-consent__list">
                  <go-field-checkbox
                    v-for="(input, key) in checkboxList"
                    :key="key"
                    v-model="value[input.model]"
                    :schema="input"
                  />
                  <button
                    class="text-primary text-xs"
                    @click="toggleSelectAll"
                  >
                    {{ hasCheckedValue ? labelsToggleButton.unselect : labelsToggleButton.select}}
                  </button>
                </div>
              </div>
            </CollapseTransition>
          </div>
          <button
            @click="postponeDecision"
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
      <div class="cookie-consent__actions-buttons m-t-sm">
        <slot name="actions-buttons">
          <button
            class="text-white text-underline tabindex-white"
            @click="customizeSettings"
            ref="customize-settings-button"
          >
            {{ customizeSettingsLabel }}
          </button>
          <button
            class="btn btn-sm m-l-md"
            style="color: #fff; border: 2px solid #fff;"
            @click="decline"
            ref="decline-button"
          >
            {{ declineLabel }}
          </button>
          <button
            class="btn btn-sm btn-inverse m-l-md"
            @click="accept"
            ref="accept-button"
          >
            {{ isOpenList ? acceptLabel : acceptAllLabel }}
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { CollapseTransition } from 'vue2-transitions'
import debounce from 'lodash.debounce'

export default {
  name: 'GoRGPDCookieConsent',
  props: {
    /**
    * labels for button toggle select all
    * {
    * select: String,
    * unselect: String,
    * }
    **/
   labelsToggleButton: {
     value: Object,
      default: () => {
        return {
          select: 'Select all',
          unselect: 'Unselect all',
        }
      }
    },
    /**
    * value or v-model is required when you have checkboxList,
    * and coresponding with model on each checkbox
    * {
    *   cookie_monitoring: true, // when this.checkboxList[0][model] === 'cookie_monitoring'
    *   cookie_media: true, // when this.checkboxList[1][model] === 'cookie_media'
    * }
    **/
    value: {
      type: Object,
      default: null,
    },
    /**
    * Checkboxlist to show checkbox. When add checkbox in checkbox list,
    * don't forget to add model coresponding
    * [
    *   {
    *     "inputName": "cookie_monitoring",
    *     "label": "Audiance monitoring",
    *     "id": "cookie_monitoring",
    *     "model": "cookie_monitoring",
    *     "wrapperClasses": "text-white is-inverse"
    *   },
    * ]
    **/
    checkboxList: {
      type: Array,
      default: () => [],
    },
    /**
    * Default state if list checkbox is opened or not
    **/
    isOpenList: {
      default: true,
      type: Boolean,
    },
    /**
    * text content use in cookie banner
    **/
    bodyContent: {
      type: String | Object,
      required: true,
    },
    /**
    * text label use in accept button when settings customization not collapsed
    **/
    acceptLabel: {
      type: String,
      required: true,
    },
    /**
    * text label use in accept button when settings customization collapsed
    **/
    acceptAllLabel: {
      type: String,
      required: true,
    },
    /**
    * text label use in decline button
    **/
    declineLabel: {
      type: String,
      required: true,
    },
    /**
    * text label use in customize settings link
    **/
    customizeSettingsLabel: {
      type: String,
      required: true,
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
  computed: {
    hasCheckedValue () {
      const keys = this.checkboxList.map((element) => element.model)
      const values = keys.map(key => this.values[key])
      return values.includes(true)
    },
    isVueComponent () {
      return !!this.bodyContent.render
    }
  },
  mounted () {
    this.checkNewOffset()
    this.debounceCheckOffset = debounce(this.checkNewOffset, 500)
    this.debounceCheckOffset()

    document.querySelector('body').addEventListener('click', this.clickOnLink)
    window.addEventListener('scroll', this.checkOffset)
    window.addEventListener('resize', this.debounceCheckOffset)
  },
  beforeDestroy () {
    this.removeListener()
  },
  methods: {
    toggleSelectAll () {
      const hasChecked = this.hasCheckedValue

      Object.keys({...this.value}).forEach((key) => {
        this.value[key] = hasChecked ? false : true
      })
    },
    customizeSettings (event) {
      this.$emit('customizeSettings')
    },
    accept () {
      if (this.isOpenList) {
	this.$emit('accept')
      }
      else {
	this.$emit('acceptAll')
      }
      this.closeCookieConsent()
    },
    decline () {
      this.$emit('decline')
      this.closeCookieConsent()
    },
    postponeDecision () {
      this.$emit('postponeDecision')
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
      document.querySelector('body').removeEventListener('click', this.clickOnLink)
    },
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    },
  },
  components: {
    CollapseTransition,
  },
}
</script>

<docs>
```js
  const text = `By clicking on "Accept", you agree to the use of
  cookies or other tracking devices to improve site navigation, analyze site usage, and
  support our marketing efforts. Click here to read our Privacy Policy.`

  const labelAccept = 'Accepter'
  const model = {
    cookie_monitoring: true,
    cookie_media: true,
    cookie_marketing: true,
  }
  const inputs = [
    {
      "type": "checkbox",
      "inputName": "cookie_monitoring",
      "label": "Audiance monitoring",
      "id": "cookie_monitoring",
      "model": "cookie_monitoring",
      "wrapperClasses": "text-white is-inverse"
    },
    {
      "type": "checkbox",
      "inputName": "cookie_media",
      "label": "Social media",
      "id": "cookie_media",
      "model": "cookie_media",
      "wrapperClasses": "text-white is-inverse"
    },
    {
      "type": "checkbox",
      "inputName": "cookie_marketing",
      "label": "Marketing",
      "id": "cookie_marketing",
      "model": "cookie_marketing",
      "wrapperClasses": "text-white is-inverse"
    },
  ]
  let isOpenList = false

  <div>
    <button class="btn btn-sm btn-primary m-b-xl" @click="isOpenList = !isOpenList">OpenList</button>
    <a href="http://master.agorize.com" target="_blank">Link to master Agorize in new tab</a>
    <div
      v-for="(value, name, key) in model"
      :key="key"
    >
      {{ name }}: {{ value }}
    </div>
    <go-cookie-consent
      :acceptLabel="labelAccept"
      :privacyData="{url: 'http://agorize.com', label: 'Our privacy content'}"
      :isOpenList="isOpenList"
      :checkboxList="inputs"
      :body-content="text"
      v-model="model"
    />
  </div>
````
</docs>
