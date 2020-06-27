const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");
 

//Routes
app.get('/', function (req, res) {
  res.render("Home");
});

app.get("/services", function (req, res) {
  res.render("Services")
});

app.get("/about", function (req, res){
  res.render("About");
});

app.get("/contact", function (req, res){
  res.render("Contact");
});
 



//Mail Routes























