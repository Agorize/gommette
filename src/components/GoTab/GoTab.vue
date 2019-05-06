<template>
  <div
    ref="myTab"
    class="go-tab bg-white text-center"
    :class="{'open' : showList}"
  >
    <button
      class="btn-dropdown text-secondary visible-xs"
      type="button"
      data-toggle="dropdown"
      :aria-expanded="`${showList}`"
      @click="toggleList"
    >
      <span class="caret m-l-sm"></span>
    </button>

    <ul
      class="nav"
      :class="`text-${align}`"
      role="tablist"
      @click-tab="selectTab"
    >
      <li
        class="visible"
        :class="{ active: tab.id === activeTab.id }"
        v-for="tab in tabs"
        :key="tab.id"
      >

        <a
          v-if="tab.url"
          :href="tab.url"
        >
          {{ tab.title }}
        </a>

        <a
          v-else
          @click="selectTab({ tabId: tab.id, updateEvent: true })"
        >
          {{ tab.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GoTab',
  props: {
    /**
    * v-model use in the parent
    **/
    value: {
      type: Object,
      default: () => ({})
    },
    /**
    * Tabs with properties
    * {
    *   id: Number,
    *   title: String,
    *   url: String
    * }
    **/
    tabs: {
      type: Array,
      default: () => ([])
    },
    /**
    * Number that can set the default active tab
    **/
    defaultActiveTabId: {
      type: Number,
      default: null
    },
    /**
    * align of the tab
    *
    **/
    align: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
      activeTab: {},
      showList: false
    }
  },
  methods: {
    selectTab ({ tabId, updateEvent = false, mobile = false }) {
      if (tabId === this.activeTab.id) return

      this.activeTab = this.tabs.find(tab => tab.id === tabId)
      this.$emit('input', this.activeTab)

      if (updateEvent) {
        this.toggleList();

        /**
         * Update event
         *
         * @event update
         * @type event
         */
        this.$emit('update', this.activeTab)
      }
    },
    toggleList () {
      this.showList = !this.showList;
    },
    hideTabWhenClickOutsideOnMobile(e) {
      if (window.matchMedia('(max-width: 768px)').matches &&
          !(this.$refs.myTab.contains(e.target)) &&
          this.showList) {
        this.toggleList();
      }
    }
  },
  created () {
    if (this.defaultActiveTabId) {
      this.selectTab({ tabId: this.defaultActiveTabId })
    } else if (this.tabs.length) {
      this.selectTab({ tabId: this.tabs[0].id })
    }
  },
  destroyed () {
    document.body.removeEventListener('click', this.hideTabWhenClickOutsideOnMobile);
  },
  mounted () {
    document.body.addEventListener('click', this.hideTabWhenClickOutsideOnMobile, true);
  }
}
</script>

<docs>
  ## Basic Tabs
  ```js
    <go-tab
      :tabs="[
        { id: 1, title: 'my-title-1' },
        { id: 2, title: 'my-title-2' },
        { id: 3, title: 'my-title-3' }
      ]"
    />
  ```

  ## Basic Tabs with align left
  ```js
    <go-tab
      :tabs="[
        { id: 1, title: 'my-title-1' },
        { id: 2, title: 'my-title-2' },
        { id: 3, title: 'my-title-3' }
      ]"
      align="left"
    />
  ```

  ## Basic Tabs with activeTab
  ```js
    <go-tab :defaultActiveTabId="2"
      :tabs="[
        { id: 1, title: 'my-title-1' },
        { id: 2, title: 'my-title-2' },
        { id: 3, title: 'my-title-3' }
      ]"
    />
  ```

  ## Basic Tabs with url
  ```js
    <go-tab
      :tabs="[
        { id: 1, title: 'my-title-1' },
        { id: 2, title: 'my-title-2', url: 'my-url' }
      ]"
    />
  ```

  ## Tabs with v-model and update event
  ```js
    const selectedTab  = {}
    const onUpdate = (value) => {
      alert(JSON.stringify(value))
    }
    <go-tab
      :tabs="[
        { id: 1, title: 'my-title-1' },
        { id: 2, title: 'my-title-2' }
      ]"
      v-model="selectedTab"
      @update="onUpdate"
    />
  ```
</docs>
