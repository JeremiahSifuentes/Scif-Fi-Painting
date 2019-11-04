var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
 
app.get('/', function (req, res) {
  res.render("Home");
});

app.get("/services", function (req, res) {
  res.render("Services")
});

app.get("/about", function (req, res){
  res.render("About");
});
 
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("The server started running!!!!!!!");
});