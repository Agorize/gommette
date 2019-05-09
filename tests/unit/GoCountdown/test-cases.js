import moment from 'moment'

export default {
  realtimeCountdown: {
    truthy: [
      {
        endDateString: moment.utc().add(2, 'days').format(),
        daysBeforeRealtime: 3
      },
      {
        endDateString: moment.utc().add(4, 'days').format(),
        daysBeforeRealtime: 6
      },
      {
        endDateString: moment.utc().add(6, 'days').format(),
        daysBeforeRealtime: 9
      },
      {
        endDateString: moment.utc().add(1, 'days').format(),
        daysBeforeRealtime: 2
      }
    ],
    falsy: [
      {
        endDateString: moment.utc().add(2, 'days').format(),
        daysBeforeRealtime: 1
      },
      {
        endDateString: moment.utc().add(4, 'days').format(),
        daysBeforeRealtime: 3
      },
      {
        endDateString: moment.utc().add(6, 'days').format(),
        daysBeforeRealtime: 2
      },
      {
        endDateString: moment.utc().add(5, 'days').format(),
        daysBeforeRealtime: 1
      }
    ]
  }
}
