<template>
  <div>
    <dropdown
      v-model="dropdownOpened"
      ref="dropdown"
      type="primary"
    >
      <slot name="dropdown-trigger" />
      <template slot="dropdown">
        <slot name="dropdown-content" />
      </template>
    </dropdown>
  </div>
</template>

<script>
export default {
  name: 'GoDropdown',
  data () {
    return {
      dropdownOpened: this.isOpen
    }
  },
  props: {
    /**
     * Is a boolean, corresponding to the state of the dropdown.
     */
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isOpen (newValue) {
      this.isOpen = newValue
    }
  }
}
</script>

<docs>
  ```js
  let dropdownOpen = true

  <div>
    <go-dropdown :is-open="dropdownOpen">
      <template v-slot:dropdown-trigger>
        <button class="btn btn-primary btn-sm m-t-sm m-b-sm dropdown-toggle">Open dropdown</button>
      </template>
      <template v-slot:dropdown-content>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </go-dropdown>
  </div>
  ```
</docs>
