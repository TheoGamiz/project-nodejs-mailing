const express = require("express");
const router = express.Router();
const db = require("../database.cjs");

router.get("/", (req, res) => {
  res.render("create");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const query = `
    INSERT INTO contact(id,name,firstname,lastname, mail, creationdate) 
    VALUES($1,$2, $3, $4, $5, $6)
    RETURNING *;
    `;
  const values = [req.body.id, req.body.name, req.body.firstname, req.body.lastname, req.body.mail, req.body.creationdate];
  const { rows } = await db.query(query, values);
  console.log(rows);
  res.redirect("/");
});

module.exports = router;