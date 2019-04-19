<template>
  <div class="go-toggle">
    <input
      :id="`toggle-${_uid}`"
      type="checkbox"
      v-model="active"
      @change="$emit('change', active)"
      :disabled="disabled"
    >
    <label
      :for="`toggle-${_uid}`"
      :class="{ [activeColor]: active }"
    >
      <GoIcon
        v-if="activeIconName"
        :name="activeIconName"
        class="icon"
      />
    </label>
  </div>
</template>

<script>
import GoIcon from '@/components/GoIcon/GoIcon'

export default {
  name: 'GoToggle',
  props: {
    activeColor: {
      type: String,
      default: 'primary'
    },
    activeIconName: {
      type: String,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  watch: {
    value: 'updateModel'
  },
  methods: {
    updateModel () {
      this.active = this.value
    }
  },
  created () {
    this.updateModel()
  },
  components: {
    GoIcon
  }
}
</script>

<docs>
## Basic Usage

```js
  var status = false;

  var onChange = (value) => {
    alert(`ON CHANGE! ${value}`)
  }

  <div>
    <go-toggle v-model="status"/>
  </div>
```

## Disabled state

```js
  var status = false;

  var onChange = (value) => {
    alert(`ON CHANGE! ${value}`)
  }

  <div>
    <go-toggle
      v-model="status"
      :disabled="true"
    />
  </div>
```

## Disabled state when active

```js
  var status = true;

  var onChange = (value) => {
    alert(`ON CHANGE! ${value}`)
  }

  <div>
    <go-toggle
      v-model="status"
      :disabled="true"
    />
  </div>
```

## Update Event

```js
  var status = false;

  var onChange = (value) => {
    alert(`ON CHANGE! ${value}`)
  }

  <div>
    <go-toggle
      v-model="status"
      @change="onChange"
    />
  </div>
```

## Active Color

```js
  var status = false;

  <div>
    <go-toggle
      v-model="status"
      active-color="success"
    />
  </div>
```

## Active Icon

```js
  var status = false;

  <div>
    <go-toggle
      v-model="status"
      active-icon-name="yes"
    />
  </div>
```
</docs>
