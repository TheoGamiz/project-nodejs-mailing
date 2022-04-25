const express = require("express");
const router = express.Router();
const db = require("../database.cjs");
const path = require("path")
const nodemailer = require ("nodemailer")
const hbs = require ("nodemailer-express-handlebars")


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "projetnodejsesgi@gmail.com",
    pass: "azertyjs",
  },
});

const nodeMailOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./templates"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(nodeMailOptions));

router.get("/", async (req, res) => {
  const query = `
    SELECT * FROM msg
    ORDER BY id;
    `;
  const { rows } = await db.query(query);
  res.render("messages", { item: rows });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const query = `
    INSERT INTO msg(destinataire, template, subject, content, creationdate) 
    VALUES($1,$2, $3, $4, $5)
    RETURNING *;
    `;
  var ladate = new Date();
  const values = [
    req.body.destinataire,
    req.body.template,
    req.body.subject,
    req.body.content,
    ladate.getDate() +
      "/" +
      (ladate.getMonth() + 1) +
      "/" +
      ladate.getFullYear(),
  ];
  const { rows } = await db.query(query, values);
  var mailOptions = {
    from: "projetnodejsesgi@gmail.com",
    to: req.body.template,
    subject: req.body.subject,
    template: "madame",
    context: {
      text: "Contenu",
    },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent succesfull : " + info.response);
    }
  });
  console.log(rows);
  res.redirect("/");
});

module.exports = router;
