const dayjs = require('dayjs')
require('dayjs/locale/zh-tw')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

module.exports = {
  currentYear: () => dayjs().year(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  relativeTimeFromNow: time => dayjs(time).locale('zh-tw').fromNow()
}
