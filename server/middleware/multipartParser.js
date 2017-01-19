/**
 * Created by zhangran on 17/1/18.
 */

import path from 'path'
import formidable from 'formidable'

const defaultOptions = {

}

export default function (options) {
  return function * fileHandler (next) {
    var _options = {
      ...defaultOptions,
      ...options
    }
    var form
    var files

    if (!isValid(this.method)) {
      yield next
    }

    if (this.is('multipart/form-data')) {
      files = yield parseForm(_options, this.req)
      this.request.files = files
    }

    yield  next
  }
}

function parseForm (options, request) {
  var files = []

  return function (done) {
    var form = new formidable.IncomingForm(options)
    form.uploadDir = options.uploadDir
    form.keepExtensions = true
    form.on('error', done)
    form.on('aborted', done)
    form.on('file', function (name, value) {
      var json = value.toJSON()
      json.filename = '/' + path.parse(json.path).base
      files.push([name, json])
    })
    form.on('end', function () {
      done(null, files)
    })

    form.parse(request)
  }
}

function isValid (method) {
  return ['GET', 'HEAD', 'DELETE'].indexOf(method.toUpperCase()) === -1
}
