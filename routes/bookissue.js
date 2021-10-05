var express = require('express')
var router = express.Router()
var db = require('../config/db')
router.get('/',function(req,res){
   db.query("select * from book_issue",function(err,reslt){
     res.send(reslt)
   })
})

router.get('/issue/iss', function (req, res, next) {

  db.query(  "SELECT * FROM book_issue b inner join book_details d on b.BOOK_CODE=d.BOOK_CODE inner join member_details m on b.MEMBER_ID=m.MEMBER_ID ",  function (err, result3) {
    res.send(result3)
  })
})


router.get('/:id', function (req, res, next) {

  db.query("SELECT b.BOOK_ISSUE_NO,d.BOOK_TITLE,m.MEMBER_NAME,b.STARTDATE,b.END FROM book_issue b inner join book_details d on b.BOOK_CODE=d.BOOK_CODE inner join member_details m on b.MEMBER_ID=m.MEMBER_ID where BOOK_ISSUE_NO=?", [req.params.id], function (err, result3) {
  if (err){
    throw err
  }  res.send(result3)
  })
})
router.post('/', function (req, res) {
  var data2 = req.body
  db.query("insert into  book_issue values (?,?,?,?,?)", [null, data2.BOOK_CODE, data2.MEMBER_ID, data2.STARTDATE,data2.END], function (err, result3) {
    if(err){
      throw err
    }

    db.query("UPDATE book_details SET remaining=remaining-1  WHERE BOOK_CODE=?", [ data2.BOOK_CODE], function (err, result4) {
      if (err) {
        throw err
      }

    })
    res.send("data saved")
  }
  )

})
router.put('/:id', function (req, res){
  var data2 = req.body
  db.query("update    book_issue set BOOK_CODE=?,MEMBER_ID=?,STARTDATE=?,END=? where BOOK_ISSUE_NO=?", [data2.BOOK_CODE, data2.MEMBER_ID, data2.STARTDATE,data2.END,req.params.id], function (err, result) {
    if(err){
      throw err    }

  
    db.query("update  book_details SET remaining=remaining+1  WHERE BOOK_CODE=? ", [ data2.BOOK_CODE], function (err, result4) {
      if (err) {
        throw err
      }

    })
    res.send("data saved")
  }
  )})
  router.delete('/delete/:id', function (req, res) {
    var data2= req.body
    db.query("DELETE FROM book_issue WHERE BOOK_ISSUE_NO=?",[req.params.id], function (err, result4) {
      if(err){
        throw(err)
      }
      res.send("deleted")
    }
  
  
    )
  
  })





module.exports = router