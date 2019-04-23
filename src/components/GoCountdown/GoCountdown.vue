<template>
  <div
    v-if="isActive || (!isActive && visibleWhenTimesOut)"
    class="go-countdown"
  >
    <!-- Icon -->
    <div class="media-left media-middle">
      <GoIcon name="time" />
    </div>

    <div class="media-body media-middle">
      <p class="m-b-none">
        <!-- @slot Realtime text slot ("remainingTime" data passed)-->
        <slot
          v-if="isActive && isItRealtime"
          name="remainingTime"
          :remainingTime="remainingTime"
        />

        <!-- @slot Days left text slot if not realtime ("remainingDays" data passed)-->
        <slot
          v-if="isActive && !isItRealtime"
          name="remainingDays"
          :remainingDays="remainingDays"
        />

        <!-- @slot Time is out slot if "visibleWhenTimesOut" set to true-->
        <slot
          v-if="!isActive && visibleWhenTimesOut"
          name="timeIsOut"
        />
      </p>
    </div>
  </div>
</template>

<script>
import Countdown from 'countdown'
import moment from 'moment/src/moment.js'

import GoIcon from '../GoIcon/GoIcon.vue'

export default {
  name: 'GoCountdown',
  props: {
    /**
     * End date the countdown is based on
     */
    endDateString: {
      type: String,
      required: true
    },
    /**
     * End date the countdown is based on
     */
    daysBeforeRealtime: {
      type: Number,
      default: 2
    },
    /**
     * Visibility after the end of the countdown
     */
    visibleWhenTimesOut: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      endDate: moment.utc(new Date(this.endDateString)),
      today: moment().utc(),
      timeObject: {},
      countdownObject: {}
    }
  },
  computed: {
    diffDates () {
      return this.endDate.diff(this.today, 'days', true)
    },
    isActive () {
      const isEndFuture = moment(this.endDate).isAfter(this.today)  // The end date must be in the future
      const isCountdownActive = this.timeObject.value < 0           // or Countdown still active

      return isEndFuture && (!this.isItRealtime || isCountdownActive)
    },
    isItRealtime () {
      return Math.floor(this.diffDates) < this.daysBeforeRealtime
    },
    remainingDays () {
      return Math.ceil(this.diffDates)
    },
    remainingTime () {
      let hoursLeftTxt = ''

      if (this.isActive) {
        const totalHours = (this.timeObject.hours + (this.timeObject.days * 24)).toString().padStart(2, '0')
        const totalMin = this.timeObject.minutes.toString().padStart(2, '0')
        const totalSec = this.timeObject.seconds.toString().padStart(2, '0')

        hoursLeftTxt = `${totalHours}:${totalMin}:${totalSec}`
      }
      return hoursLeftTxt
    }
  },
  mounted () {
    if (this.isItRealtime) {
      this.initCountdown()
    }
  },
  beforeDestroy () {
    this.destroyCountdown()
    this.countdownObject = {}
    this.timeObject = {}
  },
  methods: {
    initCountdown () {
      this.countdownObject = Countdown(this.endDate, (ts) => {
        this.timeObject = ts
      }, Countdown.DAYS | Countdown.HOURS | Countdown.MINUTES | Countdown.SECONDS)
    },
    destroyCountdown () {
      window.clearInterval(this.countdownObject)
      this.countdownObject = null
      this.timeObject = {}
    }
  },
  watch: {
    endDateString (value) {
      if (this.isItRealtime) {
        this.destroyCountdown()
        this.initCountdown()
      }
    },
    isActive (value) {
      if (!value) {
        this.destroyCountdown()
      }
    }
  },
  components: {
    GoIcon
  }
}
</script>

<docs>
## Basic Usage
```js
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const tomorrowFormat = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`

  <go-countdown
    :end-date-string="tomorrowFormat"
  >
    <template slot="remainingTime" slot-scope="{ remainingTime }">
      Time left: <strong>{{ remainingTime }}</strong>
    </template>
    <template slot="remainingDays" slot-scope="{ remainingDays }">
      {{ remainingDays }} days left
    </template>
    <template slot="timeIsOut">
      Time is out!
    </template>
  </go-countdown>
```

## "Days before realtime" Usage
```js
  <go-countdown
    end-date-string="2019-06-24"
    :days-before-realtime="10"
  >
    <template slot="remainingTime" slot-scope="{ remainingTime }">
      Time left: <strong>{{ remainingTime }}</strong>
    </template>
    <template slot="remainingDays" slot-scope="{ remainingDays }">
      {{ remainingDays }} days left
    </template>
    <template slot="timeIsOut">
      Time is out!
    </template>
  </go-countdown>
```

## Basic Time's out preview
```js
  <go-countdown
    end-date-string="2019-02-24"
    :days-before-realtime="10"
  >
    <template slot="remainingTime" slot-scope="{ remainingTime }">
      Time left: <strong>{{ remainingTime }}</strong>
    </template>
    <template slot="remainingDays" slot-scope="{ remainingDays }">
      {{ remainingDays }} days left
    </template>
    <template slot="timeIsOut">
      Time is out!
    </template>
  </go-countdown>
```

## Time's out with message
```js
  <go-countdown
    end-date-string="2019-02-24"
    :days-before-realtime="10"
    :visible-when-times-out="true"
  >
    <template slot="remainingTime" slot-scope="{ remainingTime }">
      Time left: <strong>{{ remainingTime }}</strong>
    </template>
    <template slot="remainingDays" slot-scope="{ remainingDays }">
      {{ remainingDays }} days left
    </template>
    <template slot="timeIsOut">
      Time is out!
    </template>
  </go-countdown>
```
</docs>
