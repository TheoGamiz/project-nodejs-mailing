const express = require("express");
const router = express.Router();
const db = require("../database.cjs");

router.get("/:id", async (req, res) => {
  const query = `
    SELECT * FROM msg
      WHERE id=$1;
      `;
  const values = [req.params.id];
  const { rows } = await db.query(query, values);
  res.render("update-messages", { data: rows[0] });
});

router.post("/:id", async (req, res) => {
  console.log(req.body);
  const query = `
    UPDATE msg
    SET template=$1 , subject=$2 , content=$3
    WHERE id=$3
    RETURNING *;
    `;
  const values = [req.body.name, req.body.mail, req.params.id];
  const { rows } = await db.query(query, values);
  console.log(rows);
  res.redirect("/update-messages");
});

module.exports = router;
