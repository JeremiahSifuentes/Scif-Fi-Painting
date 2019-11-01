var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.render("home.ejs")
})
 
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("The server started running!!!!!!!");
});