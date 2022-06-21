const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
var handlebars = require('handlebars');
var helpers = require('handlebars-helpers');
var math = helpers.math({
  handlebars: handlebars
});

const options = {
  viewEngine: {
    extname: '.handlebars',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    },
    layoutsDir: "src/views/layouts/",
    defaultLayout: false,
    partialsDir: "src/views/layouts/",
  },
  viewPath: "src/views/layouts",
  extName: '.handlebars',

}

const sendEmail = (email, subject, text, products) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      }
    })
    transporter.use("compile", hbs(options));
    transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      template: 'main',
      context: {
        text: text,
        products: products
      }
    })
    console.log("Email send successfully")
  } catch (error) {
    console.log(error)
  }
}


module.exports = sendEmail