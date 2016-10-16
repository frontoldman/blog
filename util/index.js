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
  }
}
