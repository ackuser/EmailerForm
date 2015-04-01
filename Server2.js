var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
      api_key: '***********************************',
      domain: '************************************'
  }
};

var nodemailerMailgun = nodemailer.createTransport("SMTP", mg(auth));

nodemailerMailgun.sendMail({
  from: 'SENDER@MAIL.COM',
  to: 'RECEIVER@MAIL.COM', // An array if you have multiple recipients.
  subject: 'Hey you, awesome!',
  text: 'Mailgun rocks, pow pow!',
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info);
  }
});
