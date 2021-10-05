var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'yedhu@123',
    database:'library'

})
connection.connect(function (err) {
  if(err)throw err
  console.log("success")  
})
module.exports=connection