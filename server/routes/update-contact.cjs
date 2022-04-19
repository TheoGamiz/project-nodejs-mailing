const express = require("express");
const router = express.Router();
const db = require("../database.cjs");

router.get("/:id", async (req, res) => {
  const query = `
    SELECT * FROM contact
      WHERE id=$1;
      `;
  const values = [req.params.id];
  const { rows } = await db.query(query, values);
  res.render("update-contact", { data: rows[0] });
});

router.post("/:id", async (req, res) => {
  console.log(req.body);
  const query = `
    UPDATE contact
    SET name=$1 , mail=$2
    WHERE id=$3
    RETURNING *;
    `;
  const values = [req.body.name, req.body.mail, req.params.id];
  const { rows } = await db.query(query, values);
  console.log(rows);
  res.redirect("/");
});

module.exports = router;