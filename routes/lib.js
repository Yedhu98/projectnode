var express = require('express')
var router = express.Router()
var db = require('../config/db')
router.get('/', function (req, res, next) {

  db.query("SELECT * FROM book_details ", function (err, result2) {
    res.send(result2)
  })
})
router.get('/book', function (req, res, next) {

  db.query("select b.BOOK_CODE,b.BOOK_TITLE,c.category,b.author,l.lang,p.publisher,b.remaining from book_details b  inner join category c on b.category_id=c.category_id inner join lang l on b.language_id=l.lang_id inner join 	publisher p on b.publisher_id=p.publisher_id ", function (err, result2) {
    if (err) {
      throw err
    }
    res.send(result2)
  })
})


router.get('/:id', function (req, res, next) {

  db.query(" select b.BOOK_CODE,b.BOOK_TITLE,c.category,b.author,l.lang,p.publisher,b.remaining from book_details b  inner join category c on b.category_id=c.category_id inner join lang l on b.language_id=l.lang_id inner join 	publisher p on b.publisher_id=p.publisher_id  where BOOK_CODE=?", [req.params.id], function (err, result4) {
    res.send(result4)
  })
})

router.get("/category/cat", (req, res) => {
  
  db.query("SELECT * FROM category", function (err, result4) {if(err){throw(err)} res.send(result4) })

})
router.get("/language/lan", (req, res) => {
  db.query("select * FROM  lang", function (err, result4) { if(err){throw(err)}res.send(result4) })
})
router.get("/publisher/pub", (req, res) => {
  db.query("select * FROM publisher", function (err, result4) {if(err){throw(err)} res.send(result4) })
})


router.post('/', function (req, res) {
  var data1 = req.body
  db.query("insert into  book_details values(?,?,?,?,?,?,?)", [data1.BOOK_CODE, data1.BOOK_TITLE, data1.category_id, data1.author, data1.language_id, data1.publisher_id, data1.remaining], function (err, result4) {
    res.send("saved")
  }


  )

})
router.put('/:id', function (req, res) {
  var data = req.body
  db.query("update  book_details  set  remaining=?,category_id=?,publisher_id=?,language_id=? where BOOK_CODE=?", [data.remaining,data.category_id,data.publisher_id,data.language_id ,req.params.id], function (err, result) {
    if (err) {
      throw err
    }
    res.send("saved")
  }


  )

}
)
router.delete('/:id', function (req, res) {
  var data1 = req.body
  db.query("DELETE FROM book_details WHERE BOOK_CODE = ?", [req.params.id], function (err, result4) {
    res.send("deletedd")
  }


  )

})


module.exports = router