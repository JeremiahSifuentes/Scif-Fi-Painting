//Requiring installed packages to use 
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
var app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("You are listening on port" + "" + PORT)
});

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

app.get('/contact', (req, res) => {
  res.render("Contact");
});

app.post('/contact', (req, res) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      
      to: 'scifipaintingtx@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.user_message, // plain text body
      replyTo: req.body.user_email //email address line
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);

  res.redirect("/contact");
})
 

























