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
  res.render("read-messages-by-id", { data: rows[0] });
});

module.exports = router;
