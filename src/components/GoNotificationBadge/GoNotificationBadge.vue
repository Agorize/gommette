<template>
  <div
    class="badge"
    :class="[notificationStyle, background]"
  >
    {{ notificationCount }}
  </div>
</template>

<script>
export default {
  name: 'GoNotificationBadge',
  data () {
    return {
      background: `bg-${this.backgroundStyle}`
    }
  },
  props: {
    /**
     * Is a number, corresponding to the notification count to display
     */
    notificationCount: {
      type: Number,
      required: true
    },
    /**
     * Is a string, corresponding to the styling class to add to the component like margin class
     */
    notificationStyle: {
      type: String
    },
    /**
     * Is a string, corresponding to the background type to add to the component
     */
    backgroundStyle: {
      type: String,
      default: 'warning'
    }
  }
}
</script>

<docs>
  ## Basic use of the go-notification-badge component with a notification count of 5
  ```js
  <go-notification-badge :notification-count="5" />
  ```
  ## Use of the go-notification-badge component with a notification count of 5, a custom styling class and an other background
  ```js
  <go-notification-badge :notification-count="5" :notification-style="'m-l-sm'" :background-style="'info'" />
  ```
</docs>
