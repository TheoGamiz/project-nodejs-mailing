const express = require("express");
const router = express.Router();
const db = require("../database.cjs");

router.get("/:id", async (req, res) => {
  const query = ` 
    DELETE FROM contact
    WHERE id=$1
    RETURNING *;
    `;
  const values = [req.params.id];
  const  result  = await db.query(query, values);
  console.log(result);
  res.redirect("/repertoire");
});

module.exports = router;