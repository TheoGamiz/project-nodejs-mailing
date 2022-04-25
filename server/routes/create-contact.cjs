const express = require("express");
const router = express.Router();
const db = require("../database.cjs");



router.post("/", async (req, res) => {
  console.log(req.body);
  const query = `
    INSERT INTO contact(name,firstname,lastname, mail, creationdate) 
    VALUES($1,$2, $3, $4, $5)
    RETURNING *;
    `;
  var ladate=new Date()
  const values = [req.body.name, req.body.firstname, req.body.lastname, req.body.mail, ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear()];
  const { rows } = await db.query(query, values);
  console.log(rows);
  res.redirect("/repertoire");
});

router.get("/", async (req, res) => {
  const query = `
    SELECT * FROM contact
    ORDER BY id;
    `;
  const { rows } = await db.query(query);
  res.render("create-contact", { item: rows });
});

module.exports = router;