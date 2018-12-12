<template>
  <div
    class="go-collapse"
    ref="collapse"
  >
    <div
      class="go-collapse__header"
      :class="{'go-collapse__header--active': isActive}"
      :style="styleHeader"
    >
      <div
        @click="toggleCollapse(index)"
        class="go-collapse__button"
        ref="collapse__button"
      >
        <div class="go-header__prefix">
          <slot name="header__prefix">
            <go-icon
              v-if="isDraggable"
              name="draggable-vertical"
              class="go-prefix__icon"
            />
          </slot>
        </div>
        <div class="go-header__title">
          <slot name="header">
            <h5 v-html="item.title"></h5>
          </slot>
        </div>
        <div class="go-header__actions">
          <slot name="header__actions" />
          <span
            v-if="beDeleted"
            @click.stop="destroyItem(index)"
            class="go-header__delete"
            ref="header__delete"
          >
            <go-icon name="delete" />
          </span>
          <go-icon
            name="bracket-right"
            class="go-header__arrow"
            :class="{'go-header__arrow--active': isActive}"
          />
        </div>
      </div>
    </div>
    <CollapseTransition :duration="isAnimated ? 400 : 0">
      <div
        v-show="isActive"
        class="go-collapse__body"
        :class="{'go-collapse__body--active': isActive}"
      >
        <slot name="body">
          <div
            class="go-body__container"
            v-html="item.body"
          />
        </slot>
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
import { CollapseTransition } from 'vue2-transitions'
import GoIcon from '@/components/GoIcon/GoIcon.vue'

export default {
  name: 'GoCollapse',
  props: {
    /**
    * Item collapse with mandatory property, title and body.
    * { title: String,
    * body: String
    * }
    */
    item: {
      type: Object,
      validator: (value) => {
        return value.title.length > 0 && value.body.length > 0
      },
      deep: true
    },
    /**
    * to know can be deleted or not
    */
    beDeleted: {
      type: Boolean,
      default: false
    },
    /**
    * It must be provide when use collapse with accordion
    */
    index: {
      type: Number,
      default: 0
    },
    /**
    * To override style on header collapse
    */
    styleHeader: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      collapse: { ...this.item }
    }
  },
  computed: {
    isActive () {
      return Boolean(this.accordion ? this.item.isActive : this.collapse.isActive)
    },
    isAnimated () {
      return this.accordion ? !this.accordion.dragging : true
    },
    isDraggable () {
      return this.accordion ? !this.accordion.normalizeDragOptions.disabled && !this.item.isFixed : false
    }
  },
  inject: {
    accordion: {
      default: null
    }
  },
  methods: {
    toggleCollapse (id) {
      if (this.accordion) {
        this.accordion.items.map((item, index) => {
          // Toggle isActive property of item clicked
          // Toggle isActive property of other items if accordion's property is set to true, otherwise set false
          if (id === index) {
            item.isActive = !item.isActive
          } else if (this.accordion.isMultiple) {
            item.isActive = item.isActive
          } else {
            item.isActive = false
          }

          return item
        })
      } else {
        this.collapse.isActive = !this.collapse.isActive
      }
    },
    /**
    * destroy event.
    *
    * @event destroyItem
    * @type undefined
    */
    destroyItem (id) {
      if (this.accordion) {
        this.accordion.items = this.accordion.items.filter((item, index) => {
          return index !== id
        })

        this.accordion.dragging = true
        this.$parent.$emit('destroyItem')
      } else {
        this.$emit('destroyItem')
      }
    }
  },
  components: {
    GoIcon,
    CollapseTransition
  }
}
</script>

<docs>
```js
  const itemInfo = {
    isActive: false,
    title: '<h1>My header <b>plop</b></h1>',
    body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
  }

  <go-collapse
    :item="itemInfo"
    :beDeleted="true"
  />
````
</docs>
