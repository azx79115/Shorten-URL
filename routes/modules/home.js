const express = require('express')
const router = express.Router()
const ShortenURL = require('../../models/ShortenURL')
const generateShortCode = require('../../shortcode_generate')
const PORT = process.env.PORT || 3000
const server = `http://localhost:${PORT}/`

//Get route to display form
router.get('/', (req, res) => {
  res.render('index')
})

//Post route to handle form submission
router.post('/shorten-url', (req, res) => {
  const { ori_url } = req.body
  let path = generateShortCode()
  const new_url = server + path

  // 用遞迴函式來檢查是否有重複的5碼
  function checkPath() {
    //用exists()來檢查資料庫是否有此資料
    ShortenURL.exists({ path })
      .then((result) => {
        if (result) {
          path = generateShortCode()//有的話重新創造一個亂數
          checkPath()//並重新執行函式檢查
        } else {
          //如果沒有的話查詢是否已經存在相同的ori_url
          ShortenURL.findOne({ ori_url })
            .then((data) => {
              if (data) {
                //有的話回傳該筆資料
                res.render('index', {
                  new_url: data.new_url,
                  ori_url: data.ori_url,
                })
              } else {
                //如果不存在，則創立一個新的
                ShortenURL.create({ ori_url, path, new_url })
                  .then(() => {
                    res.render('index', { ori_url, new_url })
                  })
                  .catch((e) => console.log(e))
              }
            })
            .catch((e) => console.log(e))
        }
      })
  }

  checkPath()
})
//輸入短網址後導回原網址
router.get('/:path', (req, res) => {
  const { path } = req.params
  ShortenURL.findOne({ path })
    .lean()
    .then((URL) => res.redirect(URL.ori_url))
    .catch((e) => console.log(e))
})


module.exports = router