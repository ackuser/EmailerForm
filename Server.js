var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var mg = require('nodemailer-mailgun-transport');
var app=express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var transporterGmail = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "SENDER@GMAIL.COM",
    pass: "*****"
  }
});
///See to get this working on Gmail --> http://stackoverflow.com/a/27160641/3029263


// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var nodemailerMailgun = nodemailer.createTransport("SMTP",{
  service: "Mailgun",
    auth: {
      user: 'SENDER@MAIL.COM',
      pass: '***********'
      //domain: '******************'
    }
});



/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
  res.sendfile('index_2.html');
});
app.get('/app.js',function(req,res){
  res.sendfile('app.js');
});
app.post('/process', function(req, res) {
  console.log('TRACE!!!');
  console.log(req.body.from);
  console.log(req.body.to);
  console.log(req.body.subject);
  console.log(req.body.body);



  var maillist = 'RECEIVER@MAIL1.COM, RECEIVER@MAIL2.COM, RECEIVER@MAIL3.COM, RECEIVER@MAIL4.COM';

  nodemailerMailgun.sendMail({
    from: 'SENDER@MAIL.COM',
    to: maillist, // An array if you have multiple recipients.
    subject: 'Quedada para la semana que viene',
    text: 'Good Morning Charlie, How you doing? or better how is going your Spanish'+
    'Yo fuí ayer al cine y vi una pelicula muy interesante. Bueno dime si te apetece venir la semana'+
    'que viene conmigo. Hasta luego, que tengas un buen día. María',
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });

  res.redirect(303, '/thank-you');

});
app.post('/process2', function(req, res) {
  console.log('TRACE!!!');
  console.log(req.body.from);
  console.log(req.body.to);
  console.log(req.body.subject);
  console.log(req.body.body);
  //res.send('email from: ' + req.body.from);
  /*
  req.assert('fname').notEmpty();
  var errors = req.validationErrors();
  if(errors) {
  res.json(500, errors);
  return;
}mail@ackarim.com*/
//  console.log('Form (from querystring): ' + req.query.form);
//console.log('CSRF token (from hidden form field): ' + req.body._csrf);
//console.log('Name (from visible form field): ' + req.mail);
//console.log('Name (from visible form field): ' + req.body);
//console.log('Email (from visible form field): ' + req.body.to);
transporterGmail.sendMail({
  from: req.body.from, // sender address
  to: req.body.to, // comma separated list of receivers
  subject: req.body.subject, // Subject line
  text: req.body.body // plaintext body
}, function(error, response){
  if(error){
    console.log(error);
  }else{
    console.log("Message sent: " + response.message);
  }
});
res.redirect(303, '/thank-you');

});
app.get('/send',function(req,res){
  console.log('TRACE!!!');
  var mailOptions={
    to : req.query.to,
    subject : req.query.subject,
    text : req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
  console.log("Express Started on Port 3000");
});
