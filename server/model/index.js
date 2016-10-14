/**
 * Created by zhangran on 16/10/12.
 */

import mongoose from 'mongoose'
import { db } from '../../config'

function startDB (fn) {
  var connection = mongoose.connect(db.url, error => {
    if (error) {
      console.log(error)
      return
    }
    console.log(`connect to db on ${db.url}`)
    fn()
  })
  global.connection = connection
}

module.exports = startDB
