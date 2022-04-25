const express = require("express");
const router = express.Router();
const db = require("../database.cjs");

router.get("/", async (req, res) => {
  const query = `
    SELECT * FROM msg
     ORDER BY id;
      `;
  const { rows } = await db.query(query);
  res.render("read-messages", { item: rows });
});

module.exports = router;