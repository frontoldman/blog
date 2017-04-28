/**
 * Created by zhangran on 17/2/3.
 */

import url from 'url'
import request from 'request'
import $ from 'cheerio'
import iconv from 'iconv-lite'
import co from 'co'
import startDB from '../server/model/'
import Article from '../server/model/Article'
import User from '../server/model/User'

// var r = parseInt("&#x662F;", 16)
// console.log(r)
var chunks = []
var size = 0
request
  .get('http://www.kanunu8.com/wuxia/201102/1625.html')
  .on('data', function(chunk) {
    chunks.push(chunk)
    size += chunk.length
  })
  .on('end', function () {
    var data = getData(chunks, size)
    var str = iconv.decode(data, 'gbk')
    var result = $('table[width="98%"]', str)
    result = $('table[bgcolor="#d4d0c8"] tr[bgcolor="#ffffff"] td a', result[0])
    var articles = []
    var getSize = 0
    console.log('抓取列表成功')

    result.each((index, item) => {
      var href = $(item).attr('href')
      articles.push({
        href
      })
      href = url.resolve('http://www.kanunu8.com/wuxia/201102/', href)
      var chunks = []
      var size = 0
      console.log(`${href} 开始抓取`)
      request.get(href)
        .on('data', function (chunk) {
          chunks.push(chunk)
          size += chunk.length
        })
        .on('end', function () {
          var data = getData(chunks, size)
          var str = iconv.decode(data, 'gbk')
          var $title = $('table h2 font', str)
          articles[index].title = $title[0].children[0].data
          var $content = $('table p', str)
          var content = $content[0].children.map(child => child.data).join('')
          articles[index].content = content
          // articles[index].creater = '5809b6c6e048547e2f54603a'
          getSize++

          console.log(`${href} 抓取成功`)
          console.log(getSize)

          if (getSize === articles.length) {
            console.log('获取详情成功')

            co(function *() {
              yield startDB

              var user = yield User.findOne({username: 'admin'})

              for(var i = 0;i<articles.length;i++){
                console.log(articles[i].title)
                yield Article.create({
                  ...articles[i],
                  creater: user._id
                })
                yield sleep
              }

              function sleep (fn) {
                setTimeout(() => fn(), 100)
              }

              console.log('保存成功')
              process.exit()
            }).catch(e => {
              console.log(e)
              process.exit()
            })


          }
        })

      // return false
    })
  })

function getData (chunks, size) {
  var data = new Buffer(size)
  for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
    var chunk = chunks[i]
    chunk.copy(data, pos)
    pos += chunk.length
  }

  return data
}
