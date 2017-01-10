module.exports = {
  get oneDayTime () {
    return 1000 * 60 * 60 * 24
  },
  getDate (day) {
    var now = Date.now()
    var time = this.oneDayTime * day + now
    var dateReturn = new Date()
    dateReturn.setTime(time)
    return dateReturn
  },
  timestampFormat (timestamp, format = 'yyyy-MM-dd') {
    if (!timestamp) {
      return ''
    }
    return this.format(new Date(timestamp), format)
  },
  format (date, format) {
    var o = {
      'M+': date.getMonth() + 1,
      // month
      'd+': date.getDate(),
      // day
      'h+': date.getHours(),
      // hour
      'm+': date.getMinutes(),
      // minute
      's+': date.getSeconds(),
      // second
      'q+': Math.floor((date.getMonth() + 3) / 3),
      // quarter
      'S': date.getMilliseconds()
      // millisecond
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')', 'i').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
}
