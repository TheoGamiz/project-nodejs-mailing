
const db = require("./database.cjs");
const express = require("express");
const morgan = require("morgan");
const create = require("./routes/create-contact.cjs");
const read = require("./routes/read-contact.cjs");
const update = require("./routes/update-contact.cjs");
const rep = require("./routes/repertoire.cjs");
const del = require("./routes/delete-contact.cjs");
const msg = require("./routes/messages.cjs");


const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/create-contact", create);
app.use("/read-contact", read);
app.use("/update-contact", update);
app.use("/delete-contact", del);
app.use("/repertoire", rep);
app.use("/messages", msg)



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