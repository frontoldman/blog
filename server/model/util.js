/**
 * Created by zhangran on 17/1/17.
 */
export function convertUTCDateToLocalDate (date) {
  if (!(date instanceof Date)) {
    return
  }
  var newDate = new Date(date.getTime())
  var offset = date.getTimezoneOffset() / 60
  var hours = date.getHours()
  newDate.setHours(hours - offset)
  return newDate
  // return new Date()
}

export function addPublicHook (Schema) {
  Schema.post('find', function(result) {
    if (Array.isArray(result)) {
      // result.forEach(updateTime)
    } else if (typeof result === 'object') {
      // updateTime(result)
    }
  })

  Schema.pre('update', function(next) {
    this.update({}, {$set: {updateTime: new Date}})
    next()
  })
}

function updateTime (obj) {
  obj.createTime = convertUTCDateToLocalDate(obj.createTime)
  obj.updateTime = convertUTCDateToLocalDate(obj.updateTime)
}
