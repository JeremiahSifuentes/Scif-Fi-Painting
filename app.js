//Requiring installed packages to use 
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');
const env = require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


var app = express();

//Middlewares
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  name: 'End of daze is a good song',
  secret: 'Sharingan!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}));


//app will listen on selected port
app.listen(PORT, () => {
    console.log("You are listening on port" + "" + PORT)
});

//Set view engine
app.use(express.static("public"));
app.set("view engine", "ejs");
 

//Routes
app.get('/', function (req, res) {
  res.render("Home", {message: req.flash('success')});
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

//Nodemailer setup with contact form
app.post('/contact', (req, res) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_EMAIL, //  user
        pass: process.env.GMAIL_PASS, // password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      
      to: process.env.GMAIL_TO, // list of receivers
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
  main().catch(console.error)
req.flash('success', 'Message Sent!')
res.redirect('/')
});