const express = require("express");
const router = express.Router();
const db = require("../database.cjs");

/* router.get("/", async (req, res) => {
  const query = `
    SELECT SUM(id)
    FROM contact
    `;
  const { rows } = await db.query(query);
  res.render("stat", { item: rows });
}); */

router.get("/", async (req, res) => {
  let query = `
    SELECT *
    FROM contact
    `;

  let query2 = `
    SELECT * 
    FROM msg ORDER BY id DESC LIMIT 1
      `;
  let query3 = `
    SELECT count(content)
    FROM msg
    `;

  let numbMsg = await db.query(query3);
  let contact = await db.query(query);
  let rows = await db.query(query2);

  res.render("stat", {
    item: contact.rows,
    lastmsg: rows.rows,
    numberMsg: numbMsg.rows,
  });
});

module.exports = router;
