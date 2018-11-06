<template>
  <div class="go-accordion">
    <draggable
      v-model="items"
      :options="normalizeDragOptions"
      :move="onMove"
      @start="dragging = true"
      @end="update"
      @destroyItem="destroyItem"
      ref="draggable"
    >
      <slot :items="items">
        <go-collapse
          v-for="(item, key) in items"
          :key="key"
          :item="item"
          :index="key"
          class="go-accordion__item"
          ref="collapse"
        />
      </slot>
    </draggable>
  </div>
</template>

<script>
import GoCollapse from './GoCollapse.vue'
const draggable = require('vuedraggable')

export default {
  name: 'GoAccordion',
  props: {
    /**
    * Is an array of integer, coresponding to collapses index we want to active by default
    */
    activeItems: {
      type: Array,
      default: () => [-1]
    },
    /**
    * If multiple collapse can be opened or not
    */
    isMultiple: {
      type: Boolean,
      default: false
    },
    /**
    * Is an array of collapse items
    */
    listItems: {
      type: Array,
      required: true
    },
    /**
    * Is an object with options of draggable, check https://github.com/SortableJS/Sortable#options
    */
    dragOptions: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dragging: false,
      items: this.listItems.map((item, index) => {
        item.isActive = this.activeItems.includes(index) ? true : item.isActive

        return item
      })
    }
  },
  provide () {
    return {
      accordion: this
    }
  },
  computed: {
    normalizeDragOptions () {
      return {
        animation: 300,
        disabled: false,
        ghostClass: 'ghost',
        ...this.dragOptions
      }
    }
  },
  methods: {
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element

      // Check before move element on dragg if
      // - Related element is present and is not fixed
      // - And drag element is not fixed
      return (!!relatedElement && !relatedElement.isFixed) && !draggedElement.isFixed
    },
    /**
    * update event.
    *
    * @event update
    * @type Array<items>
    */
    update (event) {
      this.$emit('update', this.items)

      this.$nextTick(() => {
        this.dragging = false
      })
    },
    /**
    * destroyItem event.
    *
    * @event destroyItem
    * @type Array<items>
    */
    destroyItem () {
      this.$emit('destroyItem', this.items)

      this.$nextTick(() => {
        this.dragging = false
      })
    }
  },
  components: {
    GoCollapse,
    draggable
  }
}
</script>

<docs>
```js
  const listItems = [
    {
      position: 1,
      isActive: false,
      isFixed: true,
      title: '<h1>My header plop plop <b>plop</b></h1>',
      body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
    },
    {
      position: 0,
      isActive: false,
      isFixed: false,
      title: '<h1>My header <b>plop</b></h1>',
      body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
    },
    {
      position: 2,
      isActive: false,
      isFixed: false,
      title: '<h1>My header <b>plop</b></h1>',
      body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
    }
  ]

  const copyListItems = JSON.parse(JSON.stringify(listItems))

  const styleHeader = {
    background: 'red'
  }

  <div>
    <go-accordion
      :listItems="listItems"
      :activeItems="[1, 2]"
      isMultiple
    />
    <br>

    <go-accordion :listItems="copyListItems">
      <template slot-scope="{ items }">
        <go-collapse
          v-for="(item, key) in items"
          :key="key"
          :index="key"
          :item="item"
          :beDeleted="true"
          :styleHeader="styleHeader"
        >
          <template slot="header">
            <span>{{ key }}</span><span v-html="item.title"/>
          </template>
        </go-collapse>
      </template>
    </go-accordion>

  </div>
````
</docs>
