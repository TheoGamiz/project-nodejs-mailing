import path from 'path';
import nodemailer from 'nodemailer' ;
import hbs from 'nodemailer-express-handlebars';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projetnodejsesgi@gmail.com',
    pass: 'azertyjs'
  }
});

const nodeMailOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve('./templates'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./templates'),
  extName: ".handlebars",
}

transporter.use('compile', hbs(nodeMailOptions));

var mailOptions = {
  from: 'projetnodejsesgi@gmail.com',
  to: "projetnodejsesgi@gmail.com",
  subject: 'Premier test',
  template: 'madame',
  context: {
    text: "Contenu"
  }
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent succesfull : ' + info.response);
  }
});