var express = require('express')
var router = express.Router()
var db = require('../config/db')
router.get('/', function (req, res) {

    db.query("SELECT * FROM member_details ",function (err, result1) {
      res.send(result1)
    })
  })

router.get('/:id', function (req, res) {

  db.query("SELECT * FROM member_details WHERE MEMBER_ID=?",[req.params.id],function (err, result1) {
    res.send(result1)
  })
})
router.post('/', function (req, res) {
  
  var data = req.body
  console.log(data)
  db.query("insert into  member_details values (?,?,?,?,?)", [data.MEMBER_ID, data.MEMBER_NAME, data.CITY, data.PHONE_NO,data.BOOK_CODE], function (err, result) {
   if(err) {
     throw(err)
   }
     res.send("saved")
  }


  )

})
router.put('/:id', function (req, res)  {
  var data = req.body
  db.query("update member_details set  MEMBER_NAME  =?, CITY=?, PHONE_NO=?, BOOK_CODE=? where MEMBER_ID=?", [data.MEMBER_NAME,data.CITY,data.PHONE_NO,data.BOOK_CODE,req.params.id], function (err, result) {
    res.send("saved")
  }


  )

}
)

router.delete('/:id', function (req, res) {
  var data5= req.body
  db.query("DELETE FROM member_details WHERE MEMBER_ID = ?",[req.params.id], function (err, result4) {
    res.send("deleted")
  }


  )

})
module.exports = router