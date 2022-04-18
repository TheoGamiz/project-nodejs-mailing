
const db = require("./database.cjs");
const express = require("express");
const morgan = require("morgan");
const create = require("./routes/create.cjs");
const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/create", create);

app.get("/", async (req, res) => {
  const query = `
    SELECT * FROM contact
    ORDER BY id;
    `;
  const { rows } = await db.query(query);
  res.render("index", { item: rows });
});

app.listen(3000, () => {
  console.log("At port 3000");
});